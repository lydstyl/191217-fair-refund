import React from 'react';
import { Link } from 'react-router-dom';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

const ChargesList = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();
  const { chargesList } = chargeStore;
  const charges = chargesList.chargesList;

  const handleDelete = event => {
    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    const chargeId = event.target.parentNode.id;

    db.collection(`/chargesLists/${chargesList.id}/charges`)
      .doc(chargeId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');

        const charge = charges.filter(
          charge => charge.chargeId === chargeId
        )[0];
        const { total, refund } = charge;

        chargeDispatch({
          type: chargeActions.ADD_TO_TOTALS.type,
          payload: { totalToAdd: -total, refundToAdd: -refund }
        });

        chargeDispatch({
          type: chargeActions.DELETE_CHARGE.type,
          payload: chargeId
        });

        chargeDispatch({
          type: chargeActions.SET_LOADING.type,
          payload: false
        });
      })
      .catch(error => {
        console.error('Error removing document: ', error);

        chargeDispatch({
          type: chargeActions.SET_LOADING.type,
          payload: false
        });
      });
  };

  const handleSelect = event => {
    const chargeId = event.target.parentNode.id;
    const charge = charges.filter(charge => charge.chargeId === chargeId)[0];

    chargeDispatch({
      type: chargeActions.SET_SELECTED_CHARGE.type,
      payload: charge
    });
  };

  return (
    <div>
      <ul>
        {charges &&
          charges.map(charge => (
            <li key={charge.chargeId} id={charge.chargeId}>
              <pre>{JSON.stringify(charge, null, 4)}</pre>

              <p>{charge.name}</p>
              <p>{charge.chargeId}</p>
              <p>
                <img src={charge.images.thumb} alt={charge.name} />
              </p>
              <p>{charge.date}</p>
              <p>
                {charge.total} x {charge.percent} / 100 = {charge.refund}
              </p>
              <p>
                <Link
                  to={{
                    pathname: `/charge/${charge.chargeId}`,
                    charge
                  }}
                >
                  détail
                </Link>
              </p>

              <input
                type='button'
                value='Selectionner'
                onClick={handleSelect}
              />
              <input type='button' value='Supprimer' onClick={handleDelete} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChargesList;

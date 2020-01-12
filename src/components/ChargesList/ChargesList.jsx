import React from 'react';

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

  return (
    <div>
      <ul>
        {charges &&
          charges.map(charge => (
            <li key={charge.chargeId} id={charge.chargeId}>
              <pre>{JSON.stringify(charge, null, 4)}</pre>

              <button onClick={handleDelete}>Supprimer</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChargesList;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEye, FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

import { useUser } from '../../reducers/useUser';
import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

const getIdFromButton = event => {
  let chargeId = null;

  if (event.target.tagName === 'svg') {
    chargeId = event.target.parentNode.parentNode.id;
  } else if (event.target.tagName === 'path') {
    chargeId = event.target.parentNode.parentNode.parentNode.id;
  } else {
    chargeId = event.target.parentNode.id;
  }
  return chargeId;
};

const ChargesList = () => {
  const {
    userStore: { currentUser }
  } = useUser();
  const { chargeStore, chargeDispatch } = useChargeCtx();

  const { chargesList } = chargeStore;
  const { email } = chargesList;

  const charges = chargesList.chargesList;

  const handleDelete = event => {
    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    const chargeId = getIdFromButton(event);

    db.collection(`/chargesLists/${chargesList.chargesListId}/charges`)
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
    const chargeId = getIdFromButton(event);
    const charge = charges.filter(charge => charge.chargeId === chargeId)[0];

    chargeDispatch({
      type: chargeActions.SET_SELECTED_CHARGE.type,
      payload: charge
    });

    window.scrollTo(0, 0); // scroll to top
  };

  return (
    <ul>
      {charges &&
        charges.map(charge => (
          <li key={charge.chargeId}>
            {charge.name && <h2>{charge.name}</h2>}
            {charge.images.thumb && (
              <p className='img'>
                <img src={charge.images.thumb} alt={charge.name} />
              </p>
            )}
            {charge.date && <p className='date'>{charge.date}</p>}
            {charge.total !== 0 && (
              <p className='numbers'>
                {charge.total} x {charge.percent} / 100 = {charge.refund}
              </p>
            )}
            <p className='button-box' id={charge.chargeId}>
              <Link
                style={{ margin: `20px ${currentUser !== email && 'auto'}` }}
                to={{
                  pathname: `/charge/${chargesList.chargesListId}/${charge.chargeId}`,
                  charge
                }}
              >
                <FaRegEye />
              </Link>

              {currentUser === email && (
                <>
                  <button onClick={handleSelect}>
                    <FaEdit />
                  </button>
                  <button onClick={handleDelete}>
                    <AiOutlineDelete />
                  </button>
                </>
              )}
            </p>
          </li>
        ))}
    </ul>
  );
};

export default ChargesList;

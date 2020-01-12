import React from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

//// UTILS
const numOr0 = shouldBeNum => {
  // return a number or zero

  if (shouldBeNum * 0 === 0) {
    // is number or string number
    return parseFloat(shouldBeNum);
  }

  return 0;
};

const ChargeForm = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();

  const handleSubmit = event => {
    event.preventDefault();

    // ADD
    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    const charge = {};
    document.querySelectorAll('.field input').forEach(input => {
      let value = input.value;

      if (input.name === 'total' || input.name === 'percent') {
        value = numOr0(input.value);
      }

      charge[input.name] = value;
    });

    const collectionRef = db.collection(
      `/chargesLists/${chargeStore.chargesList.id}/charges`
    );

    collectionRef
      .add(charge)
      .then(doc => {
        charge.chargeId = doc.id;

        // console.log(charge.id);

        chargeDispatch({
          type: chargeActions.ADD_CHARGE.type,
          payload: charge
        });

        chargeDispatch({
          type: chargeActions.SET_LOADING.type,
          payload: false
        });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        chargeDispatch({
          type: chargeActions.SET_LOADING.type,
          payload: false
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>aaa {Array.isArray(chargeStore.chargesList.chargesList)}</div> */}

      <div className='field'>
        <label>Nom</label>
        <input type='text' name='name' />
      </div>
      <div className='field'>
        <label>Montant total</label>
        <input type='number' name='total' step='0.01' />
      </div>
      <div className='field'>
        <label>Pourcentage remboursement</label>
        <input type='number' name='percent' step='0.01' />
      </div>
      <div className='field'>
        <label>Date</label>
        <input type='date' name='date' />
      </div>
      <div className='field'>
        <label>Preuve / image</label>
        <input type='file' name='image' />
      </div>
      <input type='submit' value='Ajouter' />
    </form>
  );
};

export default ChargeForm;

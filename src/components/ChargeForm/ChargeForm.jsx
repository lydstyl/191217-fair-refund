import React from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

const ChargeForm = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();

  const handleSubmit = event => {
    event.preventDefault();

    const charge = {};
    document.querySelectorAll('.field input').forEach(input => {
      charge[input.name] = input.value;
    });

    const collectionRef = db.collection(
      `/chargesLists/${chargeStore.chargesList.id}/charges`
    );

    collectionRef
      .add(charge)
      .then(doc => {
        charge.id = doc.id;
        console.log('super charge', charge);

        chargeDispatch({
          type: chargeActions.SET_CHARGES_LIST.type,
          payload: charge
        });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
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
        <label>Date</label>
        <input type='date' name='date' />
      </div>
      <input type='submit' value='ADD' />
    </form>
  );
};

export default ChargeForm;

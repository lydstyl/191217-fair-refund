import React, { useState } from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

const ChargeForm = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();
  const [currentPercent, setCurrentPercent] = useState(
    chargeStore.chargesList.defaultPercent
  );

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
        value = chargeActions.numOr0(input.value);
      }

      charge[input.name] = value;
    });

    charge.refund = chargeActions.twoDecimals(
      (charge.total * charge.percent) / 100
    );

    chargeDispatch({
      type: chargeActions.ADD_TO_TOTALS.type,
      payload: { totalToAdd: charge.total, refundToAdd: charge.refund }
    });

    const collectionRef = db.collection(
      `/chargesLists/${chargeStore.chargesList.id}/charges`
    );

    collectionRef
      .add(charge)
      .then(doc => {
        charge.chargeId = doc.id;

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

  const handlePercentChange = event => {
    console.log(event.target.value);

    // chargeDispatch({
    //   type: chargeActions.SET_CURRENT_CHARGE_PERCENT.type,
    //   payload: event.target.value
    // });

    setCurrentPercent(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <pre>
        chargeStore.chargesList.defaultPercent{' '}
        {JSON.stringify(chargeStore.chargesList.defaultPercent, null, 4)}
      </pre> */}

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
        <input
          type='number'
          name='percent'
          step='0.01'
          onChange={handlePercentChange}
          value={currentPercent}
        />
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

import React, { useState, useEffect } from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

const ChargeForm = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();

  Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  const { charge } = chargeStore; // the selected charge in the store

  const [formCharge, setFormCharge] = useState({
    date: charge.date || new Date().toDateInputValue() || '',
    image: charge.image || '',
    name: charge.name || '',
    percent: charge.percent || chargeStore.chargesList.defaultPercent || 0,
    refund: charge.refund || 0,
    total: charge.total || ''
  });

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

  const handleFormChange = event => {
    setFormCharge({ ...formCharge, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setFormCharge({ ...formCharge, ...charge });
  }, [charge]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='field'>
        <label>Nom</label>
        <input
          type='text'
          name='name'
          onChange={handleFormChange}
          value={formCharge.name}
        />
      </div>

      <div className='field'>
        <label>Montant total</label>
        <input
          type='number'
          name='total'
          step='0.01'
          onChange={handleFormChange}
          value={formCharge.total}
        />
      </div>

      <div className='field'>
        <label>Pourcentage remboursement</label>
        <input
          type='number'
          name='percent'
          step='0.01'
          onChange={handleFormChange}
          value={formCharge.percent}
        />
      </div>

      <div className='field'>
        <label>Date</label>
        <input
          type='date'
          name='date'
          onChange={handleFormChange}
          value={formCharge.date}
        />
      </div>

      <div className='field'>
        <label>Preuve / image</label>
        <input
          type='file'
          name='image'
          onChange={handleFormChange}
          value={formCharge.image}
        />
      </div>

      <input type='submit' value='Ajouter' />
    </form>
  );
};

export default ChargeForm;

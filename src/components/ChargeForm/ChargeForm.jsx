import React, { useState, useEffect } from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Fields from './Fields';

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

  const [submitButtons, setSubmitButtons] = useState(
    <input type='submit' value='Ajouter' />
  );

  const clearForm = () => {
    setFormCharge({
      date: new Date().toDateInputValue(),
      image: '',
      name: '',
      percent: chargeStore.chargesList.defaultPercent || 0,
      refund: charge.refund || 0,
      total: ''
    });
  };

  const getChargeFromHtml = () => {
    const charge = {};
    document.querySelectorAll('.field input').forEach(input => {
      let value = input.value;

      if (input.name === 'total' || input.name === 'percent') {
        value = chargeActions.numOr0(value);
      }

      charge[input.name] = value;
    });

    charge.refund = chargeActions.twoDecimals(
      (charge.total * charge.percent) / 100
    );

    return charge;
  };

  const handleSubmit = event => {
    event.preventDefault();

    // ADD
    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    const charge = getChargeFromHtml();
    const mode = document.querySelector('input[type=submit]').value;

    if (mode === 'Ajouter') {
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
    } else {
      // EDIT
      chargeDispatch({
        type: chargeActions.SET_LOADING.type,
        payload: true
      });

      const data = getChargeFromHtml(); // the charge info

      data.chargeId = chargeStore.charge.chargeId;

      db.collection(`/chargesLists/${chargeStore.chargesList.id}/charges`)
        .doc(chargeStore.charge.chargeId)
        .set(data)
        .then(() => {
          console.log('Document successfully edited!');

          chargeDispatch({
            type: chargeActions.SET_CHARGE.type,
            payload: data
          });

          const newTotal = data.total;
          const previousTotal = chargeStore.charge.total;
          const totalToAdd = newTotal - previousTotal;

          const newRefund = data.refund;
          const previousRefund = chargeStore.charge.refund;
          const refundToAdd = newRefund - previousRefund;

          chargeDispatch({
            type: chargeActions.ADD_TO_TOTALS.type,
            payload: { totalToAdd, refundToAdd }
          });

          chargeDispatch({
            type: chargeActions.SET_SELECTED_CHARGE.type,
            payload: {}
          });

          chargeDispatch({
            type: chargeActions.SET_LOADING.type,
            payload: false
          });
        })
        .catch(error => {
          console.error('Error editing document: ', error);

          chargeDispatch({
            type: chargeActions.SET_LOADING.type,
            payload: false
          });
        });
    }
  };

  const handleFormChange = event => {
    setFormCharge({ ...formCharge, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    chargeDispatch({
      type: chargeActions.SET_SELECTED_CHARGE.type,
      payload: {}
    });

    clearForm();

    setSubmitButtons(<input type='submit' value='Ajouter' />);
  };

  useEffect(() => {
    setFormCharge({ ...formCharge, ...charge });

    if (charge.chargeId) {
      // we have selected a charge for EDIT
      setSubmitButtons(
        <>
          <input type='submit' value='Éditer' />
          <input type='button' value='Annuler' onClick={handleCancel} />
        </>
      );
    }
  }, [charge]);

  return (
    <form onSubmit={handleSubmit}>
      <Fields handleFormChange={handleFormChange} formCharge={formCharge} />

      {submitButtons}
    </form>
  );
};

export default ChargeForm;

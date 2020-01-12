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

          // // calculate new totals
          // // old percent and total
          // const oldCharge = charges.filter(charge => charge.id === chargeId)[0]
          //   .data;
          // // new are in data
          // const diff = {
          //   chargeTotal: numOr0(data.chargeTotal) - numOr0(oldCharge.chargeTotal),
          //   chargePercent:
          //     numOr0(data.chargeTotal) * numOr0(data.chargePercent) -
          //     numOr0(oldCharge.chargeTotal) * numOr0(oldCharge.chargePercent)
          // };
          // addToTotals(diff.chargeTotal, diff.chargePercent);

          // setCharges(
          //   charges.map(charge => {
          //     if (charge.id === chargeId) {
          //       return { ...charge, data };
          //     }
          //     return charge;
          //   })
          // );

          chargeDispatch({
            type: chargeActions.SET_CHARGE.type,
            payload: data
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

  useEffect(() => {
    setFormCharge({ ...formCharge, ...charge });

    if (charge.chargeId) {
      // we have selected a charge for EDIT
      setSubmitButtons(<input type='submit' value='Éditer' />);
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

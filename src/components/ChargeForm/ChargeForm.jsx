import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';

import { clearedForm, getChargeFromHtml } from './utils';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';
import Fields from './Fields';

import { db } from '../../utils/firebase/base';

const ChargeForm = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();

  const {
    charge, // the selected charge in the store
    chargesList: { defaultPercent }
  } = chargeStore;

  const [formCharge, setFormCharge] = useState(
    clearedForm(defaultPercent, charge && charge.refund)
  );

  const [submitButtons, setSubmitButtons] = useState(
    <input type='submit' value='Ajouter' />
  );

  const clearForm = () => {
    setFormCharge(clearedForm(defaultPercent, charge.refund));
  };

  const handleSubmit = (event, mode) => {
    event.preventDefault();

    // ADD
    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    const charge = getChargeFromHtml(chargeStore.charge.images);

    if (mode !== 'Éditer') {
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
            type: chargeActions.SET_SELECTED_CHARGE.type,
            payload: {}
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

      const data = getChargeFromHtml(chargeStore.charge.images); // the charge info

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

    if (charge && charge.chargeId) {
      // we have selected a charge for EDIT
      setSubmitButtons(
        <>
          <button onClick={(event, mode) => handleSubmit(event, 'Éditer')}>
            <FaEdit />
          </button>

          <button onClick={handleCancel}>
            <TiCancel />
          </button>
        </>
      );
    }
    // eslint-disable-next-line
  }, [charge]);

  return (
    <form onSubmit={handleSubmit}>
      {/* <pre>{JSON.stringify(chargeStore.charge, null, 4)}</pre> */}

      <Fields handleFormChange={handleFormChange} formCharge={formCharge} />

      {submitButtons}
    </form>
  );
};

export default ChargeForm;

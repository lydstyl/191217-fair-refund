import React, { useEffect } from 'react';

import { db } from '../../utils/firebase/base';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Spinner from '../../images/spinner.gif';

import ChargeForm from '../ChargeForm/ChargeForm';

const ChargesListBox = props => {
  const { chargeStore, chargeDispatch } = useChargeCtx();

  useEffect(() => {
    const chargesListId = props.location.pathname.split('/')[2];

    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    db.collection(`chargesLists`)
      .doc(chargesListId)
      .get()
      .then(res => {
        chargeDispatch({
          type: chargeActions.SET_CHARGES_LIST.type,
          payload: res.data()
        });
        db.collection(`/chargesLists/${chargesListId}/charges`)
          .orderBy('date')

          .get()
          .then(querySnapshot => {
            const chargesList = [];

            querySnapshot.forEach(doc => {
              chargesList.push({ chargeId: doc.id, ...doc.data() });
            });

            const data = { chargesListId, chargesList };

            chargeDispatch({
              type: chargeActions.SET_CHARGES_LIST.type,
              payload: data
            });

            chargeDispatch({
              type: chargeActions.SET_LOADING.type,
              payload: false
            });
          });
      });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {chargeStore.loading ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <>
          <h1>Détail de la liste de dépenses</h1>
          <pre>{JSON.stringify(chargeStore, null, 4)}</pre>

          <ChargeForm />
        </>
      )}
    </>
  );
};

export default ChargesListBox;

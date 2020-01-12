import React, { useEffect } from 'react';

import { db } from '../../utils/firebase/base';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Spinner from '../../images/spinner.gif';

import ChargeForm from '../ChargeForm/ChargeForm';
import ChargesList from '../ChargesList/ChargesList';

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
        console.log(res.data());

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
              const docData = doc.data();

              docData.total = chargeActions.numOr0(docData.total);
              docData.percent = chargeActions.numOr0(docData.percent);
              docData.refund = chargeActions.numOr0(docData.refund);

              chargesList.push({ chargeId: doc.id, ...docData });
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

          <ChargesList />
        </>
      )}
    </>
  );
};

export default ChargesListBox;

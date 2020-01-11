import React, { useEffect } from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Spinner from '../../images/spinner.gif';

const Test = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();
  console.log(
    'Test component render ?!'
    // chargeStore
  );

  useEffect(() => {
    const asyncFun = async () => {
      chargeDispatch({
        type: chargeActions.SET_LOADING.type,
        payload: true
      });

      const querySnapshot = await chargeActions.GET_CHARGES_LISTS_FROM_DB.getChargesListCollectionRef();

      const chargesLists = [];
      querySnapshot.docs.forEach(doc => {
        chargesLists.push({
          id: doc.id,
          ...doc.data()
        });
      });

      chargeDispatch({
        type: chargeActions.SET_CHARGES_LISTS.type,
        payload: chargesLists
      });

      chargeDispatch({
        type: chargeActions.SET_LOADING.type,
        payload: false
      });
    };

    asyncFun();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {chargeStore.loading ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <>
          <h1>TEST</h1>
          <p>{JSON.stringify(chargeStore)}</p>
        </>
      )}
    </div>
  );
};

export default Test;

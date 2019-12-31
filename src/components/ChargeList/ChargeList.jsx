import React, { useState, useEffect } from 'react';

import { useCharge } from '../../reducers/useCharge';

// import { db } from '../../utils/firebase/base';

const ChargeList = () => {
  const [listId, setListId] = useState(null);

  const { chargeStore, chargeDispatch } = useCharge();

  useEffect(() => {
    let listId = window.location.href.split('/');
    listId = listId[listId.length - 1]; // list id from url

    setListId(listId);

    // const getDocsFromCollection = async chargeListId => {
    //   const snapshot = await db
    //     .collection(`/chargesLists/${chargeListId}/charges`)
    //     .get();

    //   const docs = snapshot.docs.map(doc => doc.data());

    //   console.log(docs);

    //   chargeDispatch({
    //     type: SET_CURRENT_CHARGES_LIST,
    //     payload: {
    //       id: chargeListId,
    //       charges: docs
    //     }
    //   });
    // };

    // getDocsFromCollection(listId);
  }, []);

  const chargeList = chargeStore[listId];

  return (
    <div>
      <h1>Charge List: {chargeList && chargeList.name}</h1>
      <div>{JSON.stringify(chargeList)}</div>
    </div>
  );
};

export default ChargeList;

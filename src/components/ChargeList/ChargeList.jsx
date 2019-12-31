import React, { useState, useEffect } from 'react';

import { useCharge } from '../../reducers/useCharge';

import { db } from '../../utils/firebase/base';

const ChargeList = () => {
  const [listId, setListId] = useState(null);

  const { chargeStore, chargeDispatch } = useCharge();
  const chargeList = chargeStore[listId];

  useEffect(() => {
    let listId = window.location.href.split('/');
    listId = listId[listId.length - 1]; // list id from url

    setListId(listId);

    const getDocsFromCollection = async () => {
      const snapshot = await db
        .collection(`/chargesLists/${listId}/charges`)
        .get();

      const docs = snapshot.docs.map(doc => doc.data());

      console.log('docs', docs, chargeList);

      // chargeDispatch({
      //   type: SET_CURRENT_CHARGES_LIST,
      //   payload: {
      //     id: chargeListId,
      //     charges: docs
      //   }
      // });
    };

    getDocsFromCollection();
  }, []);

  return (
    <div>
      <h1>Charge List: {chargeList && chargeList.name}</h1>
      <h2>listId: {listId}</h2>
      <div>{JSON.stringify(chargeList)}</div>
      <input type='text' />
    </div>
  );
};

export default ChargeList;

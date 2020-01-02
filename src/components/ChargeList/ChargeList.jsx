import React, { useState, useEffect } from 'react';

import { useUser } from '../../reducers/useUser';
import {
  useCharge,
  SET_INITIAL_CHARGES_LIST,
  SET_CURRENT_LIST_CHARGES
} from '../../reducers/useCharge';

import { db } from '../../utils/firebase/base';

const ChargeList = () => {
  const [listId, setListId] = useState(null);

  const { userStore } = useUser();
  const { chargeStore, chargeDispatch } = useCharge();

  const email = userStore.currentUser;

  const currentList = chargeStore[listId]; // can have listEmail, listName & listCharges

  useEffect(() => {
    // get list id from url
    const splitedUrl = window.location.href.split('/');
    setListId(splitedUrl[splitedUrl.length - 1]);

    // init chargeStore if necessary; todo factorise because the same code is used in an other component
    if (!chargeStore.length) {
      const initialList = {};

      db.collection('chargesLists')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const email = doc.data().email;

            initialList[doc.id] = {
              email,
              name: doc.data().name
            };
          });

          chargeDispatch({
            type: SET_INITIAL_CHARGES_LIST,
            payload: initialList
          });
        });
    }

    // get charges of the list
    const getDocsFromCollection = async () => {
      const snapshot = await db
        .collection(`/chargesLists/${listId}/charges`)
        .get();

      const chargesOfTheCurrentList = snapshot.docs.map(doc => doc.data());

      // set charges to chargeStore
      if (chargesOfTheCurrentList.length) {
        chargeDispatch({
          type: SET_CURRENT_LIST_CHARGES,
          payload: { id: listId, charges: chargesOfTheCurrentList }
        });
      }
    };

    getDocsFromCollection();
    // eslint-disable-next-line
  }, [email]);

  return (
    <div>
      {email && currentList && (
        <>
          <h1>listName: {currentList.name}</h1>
          <h2>listId: {listId}</h2>
          <h2>listEmail: {currentList.email}</h2>

          <div>listCharges: {JSON.stringify(currentList.charges)}</div>
        </>
      )}
    </div>
  );
};

export default ChargeList;

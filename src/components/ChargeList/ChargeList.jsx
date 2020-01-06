import React, { useState, useEffect } from 'react';

import { db } from '../../utils/firebase/base';

import { useUser } from '../../reducers/useUser';
import {
  useCharge,
  SET_INITIAL_CHARGES_LIST,
  SET_CURRENT_LIST_CHARGES,
  ADD_CHARGE
} from '../../reducers/useCharge';

import Charge from '../Charge/Charge';

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

      const chargesOfTheCurrentList = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));

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

  // ADD CHARGE
  const handleAddCharge = async e => {
    const name = document.querySelector('[name=chargeName]').value;

    try {
      await db
        .collection(`/chargesLists/${listId}/charges`)
        .add({ name: name })
        .then(docRef => {
          chargeDispatch({
            type: ADD_CHARGE,
            payload: { listId, chargeId: docRef.id, name }
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>ChargeList</h1>
      {email && currentList && (
        <>
          <div>listCharges: {JSON.stringify(currentList.charges)}</div>
          <h2>listName: {currentList.name}</h2>
          <h2>listId: {listId}</h2>
          <h2>listEmail: {currentList.email}</h2>

          <div>
            <label>chargeName</label>
            <input name='chargeName' type='text' />
          </div>
          <div>
            <label>chargeDate</label>
            <input name='chargeDate' type='text' />
          </div>
          <div>
            <label>chargeTotal</label>
            <input name='chargeTotal' type='text' />
          </div>
          <div>
            <label>chargePercent</label>
            <input name='chargePercent' type='text' />
          </div>
          <div>
            <label>image</label>
            <input name='image' type='text' />
          </div>

          <div>
            <input onClick={handleAddCharge} type='button' value='ADD' />
          </div>
          <ul>
            {currentList.charges &&
              currentList.charges.map(charge => (
                <Charge
                  key={charge.id}
                  chargesListId={listId}
                  charge={charge}
                />
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChargeList;

import React from 'react';

import { db } from '../../utils/firebase/base';

import {
  useCharge,
  ADD_CHARGES_LIST,
  REMOVE_CHARGES_LIST
} from '../../reducers/useCharge';

const ChargesLists = () => {
  const { chargeStore, chargeDispatch } = useCharge();

  const handleAddList = () => {
    const email = document.querySelector('input').value;

    db.collection('users')
      .add({ email })

      .then(function(docRef) {
        console.log(docRef.id);
        chargeDispatch({
          type: ADD_CHARGES_LIST,
          payload: { id: docRef.id, email }
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  const handleRemoveList = id => {
    db.collection('users')
      .doc(id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
        chargeDispatch({
          type: REMOVE_CHARGES_LIST,
          payload: id
        });
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <div>
      <p>{JSON.stringify(chargeStore)}</p>
      <div>
        <input type='text' />
        <button onClick={handleAddList}>ADD</button>
      </div>

      <ul>
        {chargeStore.map(chargeList => (
          <li key={chargeList.id}>
            <p>{chargeList.email}</p>
            <button onClick={() => handleRemoveList(chargeList.id)}>DEL</button>
          </li>
        ))}
      </ul>

      <button
        onClick={() =>
          chargeDispatch({
            type: 'ADD_CHARGES_LIST',
            payload: { id: 'idFour', name: 'four' }
          })
        }
      >
        ADD_CHARGES_LIST
      </button>

      <button
        onClick={() =>
          chargeDispatch({ type: 'REMOVE_CHARGES_LIST', payload: 'idTwo' })
        }
      >
        REMOVE_CHARGES_LIST
      </button>
    </div>
  );
};

export default ChargesLists;

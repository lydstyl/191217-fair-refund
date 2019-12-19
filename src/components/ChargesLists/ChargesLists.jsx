import React from 'react';

import { useCharge } from '../../Reducers/useCharge';
import { db } from '../../utils/firebase/base';

const ChargesLists = () => {
  const { chargeStore, chargeDispatch } = useCharge();

  const handleRemoveList = id => {
    db.collection('users')
      .doc(id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
        chargeDispatch({
          type: 'REMOVE_CHARGES_LIST',
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

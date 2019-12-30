import React from 'react';
import { Link } from 'react-router-dom';

import { db } from '../../utils/firebase/base';

import {
  useCharge,
  ADD_CHARGES_LIST,
  REMOVE_CHARGES_LIST
} from '../../reducers/useCharge';

import './ChargesLists.scss';

const ChargesLists = () => {
  const { chargeStore, chargeDispatch } = useCharge();

  const handleAddList = event => {
    event.preventDefault();

    const email = document.querySelector('input').value;
    const password = document.querySelector('[name=password]').value;

    db.collection('users')
      .add({ email })
      .then(function(docRef) {
        console.log(docRef.id);
        chargeDispatch({
          type: ADD_CHARGES_LIST,
          payload: {
            id: docRef.id,
            email,
            password
          }
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
      <form onSubmit={handleAddList}>
        <input type='text' />
        <input name='password' type='password' />
        <button>ADD</button>
      </form>

      <ul className='charges-lists'>
        {chargeStore.map(chargeList => (
          <li key={chargeList.id}>
            <p>{chargeList.email}</p>

            <Link to={`/charge-list/${chargeList.id}`} chargelist={chargeList}>
              {`/charge-list/${chargeList.id}`}
            </Link>

            <button onClick={() => handleRemoveList(chargeList.id)}>DEL</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChargesLists;

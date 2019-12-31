import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../Auth/Auth';
import { db } from '../../utils/firebase/base';

import {
  useCharge,
  ADD_CHARGES_LIST,
  REMOVE_CHARGES_LIST
} from '../../reducers/useCharge';

import './ChargesLists.scss';

const ChargesLists = () => {
  const { currentUser } = useContext(AuthContext);
  const { chargeStore, chargeDispatch } = useCharge();

  useEffect(() => {
    if (!chargeStore.length) {
      // initialState for useCharge reducer
      db.collection('chargesLists')
        .where('email', '==', currentUser.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            chargeDispatch({
              type: ADD_CHARGES_LIST,
              payload: {
                id: doc.id,
                email: doc.data().email,
                name: doc.data().name
              }
            });
          });
        });
    }
  }, []);

  const handleAddList = event => {
    event.preventDefault();

    const name = document.querySelector('[name=name]').value;
    const email = currentUser.email;

    db.collection('chargesLists')
      .add({ email, name })
      .then(function(docRef) {
        chargeDispatch({
          type: ADD_CHARGES_LIST,
          payload: {
            id: docRef.id,
            email,
            name
          }
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  const handleRemoveList = id => {
    db.collection('chargesLists')
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
        <input name='name' type='text' />
        <button>ADD</button>
      </form>

      <ul className='charges-lists'>
        {chargeStore.map(chargeList => (
          <li key={chargeList.id}>
            <p>email: {chargeList.email}</p>
            <p>name: {chargeList.name}</p>

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

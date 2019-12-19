import React, { useEffect, useState } from 'react';

import { db } from '../../utils/firebase/base';
import { ChargeListProvider } from '../ChargeListProvider/ChargeListProvider';

import AllChargeList from '../AllChargeList/AllChargeList';

import './ChargeListBox.scss';

export const ChargeListBox = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection('users')
      .get()
      .then(querySnapshot => {
        const dbUsers = [];
        querySnapshot.forEach(doc => {
          dbUsers.push({ id: doc.id, email: doc.data().email });
        });
        setUsers([...users, ...dbUsers]);
      });
    // eslint-disable-next-line
  }, []);

  const handleAdd = e => {
    const email = document.querySelector('input').value;
    db.collection('users')
      .add({ email })

      .then(function(docRef) {
        setUsers([...users, { id: docRef.id, email }]);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  return (
    <ChargeListProvider>
      <div>
        <h1>Listes de dépenses</h1>

        <input type='text' />
        <button onClick={handleAdd}>Add</button>

        <AllChargeList />
      </div>
    </ChargeListProvider>
  );
};

export default ChargeListBox;

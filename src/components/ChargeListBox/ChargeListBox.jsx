import React, { useEffect, useState, useContext } from 'react';

import ChargeListItem from '../ChargeListItem/ChargeListItem';

import { db } from '../../utils/firebase/base';
import { ChargeListProvider } from '../ChargeListProvider/ChargeListProvider';
import Test2 from '../Test/Test';

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
    <div>
      <h1>Listes de dépenses</h1>

      <input type='text' />
      <button onClick={handleAdd}>Add</button>

      <ChargeListProvider>
        <Test2 />
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <ChargeListItem user={user} />
            </li>
          ))}
        </ul>
      </ChargeListProvider>
    </div>
  );
};

export default ChargeListBox;

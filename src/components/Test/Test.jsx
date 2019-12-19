import React, { useEffect, useState } from 'react';

import { db } from '../../utils/firebase/base';

import './Test.scss';

export const Test = () => {
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
      <h1>Test</h1>

      <input type='text' />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;

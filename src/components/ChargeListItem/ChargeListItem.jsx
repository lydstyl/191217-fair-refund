import React, { useState } from 'react';

import { db } from '../../utils/firebase/base';

export const ChargeListItem = ({ user }) => {
  const [userInState, setUser] = useState(user);

  const handleDeleteItem = e => {
    const { id } = e.target.parentNode;

    db.collection('users')
      .doc(id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
        setUser(null);
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  };

  if (userInState) {
    return (
      <div id={userInState.id}>
        <div>{userInState.email}</div>
        <button onClick={handleDeleteItem} className='deleteItem'>
          Supprimer
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default ChargeListItem;

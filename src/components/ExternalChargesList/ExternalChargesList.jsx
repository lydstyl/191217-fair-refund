import React, { useState, useEffect } from 'react';

import { db } from '../../utils/firebase/base';

const ExternalChargesList = () => {
  const [chargesList, setChargesList] = useState([]);
  const [listId, setListId] = useState('8RD5wMk4gZK0sfcGqA6t');

  const handleSubmit = e => {
    e.preventDefault();

    setListId(e.target.querySelector('input').value);
  };

  useEffect(() => {
    const get = async () => {
      const snapshot = await db
        .collection(`/chargesLists/${listId}/charges`)
        .get();

      const chargesOfTheCurrentList = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));

      setChargesList(chargesOfTheCurrentList);
    };

    get();
  }, [listId]);

  return (
    <>
      <h1>ExternalChargesList</h1>

      <form onSubmit={e => handleSubmit(e)}>
        <input type='text' />
        <input type='submit' value='GET' />
      </form>

      <h2>{listId}</h2>
      <ul>
        {chargesList.length &&
          chargesList.map(charge => (
            <li key={charge.id}>{charge.data.name}</li>
          ))}
      </ul>
    </>
  );
};

export default ExternalChargesList;

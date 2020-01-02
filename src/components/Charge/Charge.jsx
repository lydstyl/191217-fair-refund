import React from 'react';

import { db } from '../../utils/firebase/base';

const Charge = ({ charge, chargesListId }) => {
  const { data } = charge;

  const deleteCharge = async chargeId => {
    db.collection(`/chargesLists/${chargesListId}/charges`)
      .doc(chargeId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  const handleDelete = e => {
    const chargeId = e.target.parentNode.id;
    deleteCharge(chargeId);
  };

  return (
    <>
      <li id={charge.id}>
        <div>{charge.id}</div>
        <div className='chargeName'>{data.name}</div>

        <input onClick={handleDelete} type='button' value='DEL' />
      </li>
    </>
  );
};

export default Charge;

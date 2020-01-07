import React from 'react';

const Charge = ({ deleteCharge, charge }) => {
  const { data } = charge;

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

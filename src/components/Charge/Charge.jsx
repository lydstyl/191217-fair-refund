import React from 'react';

const Charge = ({ deleteCharge, selectCharge, charge }) => {
  const { data } = charge;

  const handleDelete = e => {
    const chargeId = e.target.parentNode.id;
    deleteCharge(chargeId);
  };

  const handleSelect = e => {
    const chargeId = e.target.parentNode.id;
    selectCharge(chargeId);
  };

  return (
    <>
      <li id={charge.id}>
        <div>{charge.id}</div>
        <div className='chargeName'>{data.name}</div>

        {deleteCharge && (
          <input onClick={handleDelete} type='button' value='DEL' />
        )}
        {deleteCharge && (
          <input onClick={handleSelect} type='button' value='SELECT' />
        )}
      </li>
    </>
  );
};

export default Charge;

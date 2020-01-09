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
      <li id={charge.id} className='charge'>
        <div>
          {charge.id} {JSON.stringify(data)}
        </div>
        <div className='cell'>{data.chargeDate}</div>
        <div className='cell'>{data.chargeName}</div>
        <div className='cell'>{data.chargeFile}</div>
        <div className='cell'>
          {data.chargeTotal} x {data.chargePercent} ={' '}
          {data.chargeTotal * data.chargePercent}
        </div>

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

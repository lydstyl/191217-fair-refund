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
        {/* <div>
          {charge.id} {JSON.stringify(data)}
        </div> */}
        <div className='cell'>
          <h2>{data.chargeName}</h2>
        </div>
        {data.chargeFile !== '' && (
          <div className='cell'>
            {/* {data.chargeFile}xxxxxxxxxx */}
            <img src={data.chargeFile} alt='charge proof' />
          </div>
        )}

        <div className='cell'>
          {data.chargeTotal} x {data.chargePercent} ={' '}
          {data.chargeTotal * data.chargePercent}
        </div>

        <div className='cell'>{data.chargeDate}</div>

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

import React from 'react';

import { Link } from 'react-router-dom';

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
    <li id={charge.id} className='charge'>
      <p>{JSON.stringify(charge)}</p>

      <div className='cell'>
        <h2>{data.chargeName}</h2>
      </div>

      {data.chargeImages.original && (
        <div className='cell'>
          <img src={data.chargeImages.thumb} alt='charge proof' />

          <Link to={`/charge/${charge.id}`}>/charge/{charge.id}</Link>

          <div>
            <a target='_blank' href={data.chargeImages.medium}>
              medium image
            </a>
            <a target='_blank' href={data.chargeImages.original}>
              original image
            </a>
          </div>
        </div>
      )}

      <div className='cell'>
        {data.chargeTotal} x {data.chargePercent} = {data.chargeRefund}
      </div>

      <div className='cell'>{data.chargeDate}</div>

      {deleteCharge && (
        <input onClick={handleDelete} type='button' value='DEL' />
      )}
      {deleteCharge && (
        <input onClick={handleSelect} type='button' value='SELECT' />
      )}
    </li>
  );
};

export default Charge;

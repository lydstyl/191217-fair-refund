import React from 'react';

import { Link } from 'react-router-dom';

const Charge = ({ deleteCharge, selectCharge, charge }) => {
  const { data } = charge;

  const handleDelete = () => {
    deleteCharge(charge.id);
  };

  const handleSelect = () => {
    selectCharge(charge.id);
  };

  return (
    <li id={charge.id} className='charge'>
      {
        <>
          <Link
            to={{
              pathname: `/charge/${charge.id}`,
              charge
            }}
          >
            {/* <p>{JSON.stringify(charge)}</p> */}

            {data.chargeName && (
              <div className='cell'>
                <h2>{data.chargeName}</h2>
              </div>
            )}

            {data.chargeImages.thumb && (
              <div className='cell'>
                <img src={data.chargeImages.thumb} alt='charge proof' />
              </div>
            )}

            <div className='cell'>
              {data.chargeTotal} x {data.chargePercent} = {data.chargeRefund}
            </div>

            {/* <div className='cell'>{data.chargeDate}</div> */}
          </Link>
          <div>
            {deleteCharge && (
              <input onClick={handleDelete} type='button' value='DEL' />
            )}
            {deleteCharge && (
              <input onClick={handleSelect} type='button' value='SELECT' />
            )}
          </div>
        </>
      }
    </li>
  );
};

export default Charge;

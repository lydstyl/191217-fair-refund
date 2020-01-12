import React from 'react';

import FileUpload from '../FileUpload/FileUpload';

const Fields = ({ handleFormChange, formCharge }) => {
  return (
    <>
      <div className='field'>
        <label>Nom</label>
        <input
          type='text'
          name='name'
          onChange={handleFormChange}
          value={formCharge.name}
        />
      </div>

      <div className='field'>
        <label>Montant total</label>
        <input
          type='number'
          name='total'
          step='0.01'
          onChange={handleFormChange}
          value={formCharge.total}
        />
      </div>

      <div className='field'>
        <label>Pourcentage remboursement</label>
        <input
          type='number'
          name='percent'
          step='0.01'
          onChange={handleFormChange}
          value={formCharge.percent}
        />
      </div>

      <div className='field'>
        <label>Date</label>
        <input
          type='date'
          name='date'
          onChange={handleFormChange}
          value={formCharge.date}
        />
      </div>

      <FileUpload />
    </>
  );
};

export default Fields;

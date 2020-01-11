import React from 'react';

const ChargeForm = () => {
  return (
    <form>
      <div className='field'>
        <label>Nom</label>
        <input type='text' name='name' />
      </div>

      <div className='field'>
        <label>Montant total</label>
        <input type='number' name='total' step='0.01' />
      </div>

      <div className='field'>
        <label>Date</label>
        <input type='date' name='date' />
      </div>

      <input type='submit' value='ADD' />
    </form>
  );
};

export default ChargeForm;

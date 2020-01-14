import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';

import { db } from '../../utils/firebase/base';

const EditChargesList = ({ location: { chargesList } }) => {
  const { chargeStore } = useChargeCtx();

  const [form, setForm] = useState({
    name: chargesList.name,
    defaultPercent: chargesList.defaultPercent
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    db.collection('chargesLists')
      .doc(chargesList.id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');

        window.location.href = '/';
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  };

  const handleUpdate = event => {
    event.preventDefault();

    document
      .querySelectorAll('.edit-charges-list form .field input')
      .forEach(input => {
        chargesList[input.name] = input.value;
      });

    db.collection('chargesLists')
      .doc(chargesList.id)
      .set(chargesList)
      .then(() => {
        console.log('Document successfully edited!');
        window.location.href = '/';
      });
  };

  if (!chargesList) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className='edit-charges-list'>
      <h1>Editer la liste de dépenses</h1>
      {/* <pre>{JSON.stringify(chargeStore, null, 4)}</pre> */}

      {/* <br />
      <pre>{JSON.stringify(chargesList, null, 4)}</pre> */}

      <h2>Editer</h2>
      <form onSubmit={handleUpdate}>
        <div className='field'>
          <label>Nome de la liste</label>
          <input
            type='text'
            name='name'
            onChange={handleChange}
            value={form.name}
          />
        </div>

        <div className='field'>
          <label>Pourcentage de demande de remboursement par default</label>
          <input
            type='number'
            name='defaultPercent'
            step='0.01'
            min='0'
            max='100'
            onChange={handleChange}
            value={form.defaultPercent}
          />
        </div>

        <input type='submit' value='EDIT' />
      </form>

      <h2>ou supprimer</h2>
      <input onClick={handleDelete} type='button' value='DEL' />
    </div>
  );
};

export default EditChargesList;

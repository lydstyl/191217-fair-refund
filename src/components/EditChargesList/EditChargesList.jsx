import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

import { db } from '../../utils/firebase/base';

import StyledEditList from './styledEditList';

const EditChargesList = ({ location: { chargesList } }) => {
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

    document.querySelectorAll('form .field input').forEach(input => {
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
    <StyledEditList>
      <h1>Editer la liste de dépenses</h1>

      <form onSubmit={handleUpdate}>
        <div className='field'>
          <label>Nom de la liste:</label>
          <input
            type='text'
            name='name'
            onChange={handleChange}
            value={form.name}
          />
        </div>

        <div className='field'>
          <label>Pourcentage de remboursement par default:</label>
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
      </form>

      <div className='buttons'>
        <button onClick={handleUpdate}>
          <FaEdit />
        </button>
        <button onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
      </div>
    </StyledEditList>
  );
};

export default EditChargesList;

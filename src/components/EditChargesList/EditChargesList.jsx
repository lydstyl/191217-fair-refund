import React from 'react';
import { Redirect } from 'react-router-dom';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

const EditChargesList = ({ location: { chargesList } }) => {
  const { chargeStore, chargeDispatch } = useChargeCtx();

  // chargesList = chargeStore.chargesLists.filter(
  //   storeList => storeList.id === chargesList.id
  // )[0];

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
  };

  if (!chargesList) {
    return <Redirect to={'/'} />;
  }

  return (
    <div>
      <h1>Editer la liste de dépenses</h1>
      <pre>{JSON.stringify(chargeStore, null, 4)}</pre>

      <br />
      <pre>{JSON.stringify(chargesList, null, 4)}</pre>

      <h2>Editer</h2>
      <form onSubmit={handleUpdate}>
        <div className='field'>
          <label>Nome de la liste</label>
          <input type='text' name='chargesListName' />
        </div>

        <div className='field'>
          <label>Pourcentage de demande de remboursement par default</label>
          <input
            type='number'
            name='chargesListDefaultPercent'
            step='0.01'
            min='0'
            max='100'
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

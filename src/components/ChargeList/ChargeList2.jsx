import React, { useState, useEffect } from 'react';

import { db } from '../../utils/firebase/base';

import { useUser } from '../../reducers/useUser';

import Charge from '../Charge/Charge';

import './ChargeList.scss';

const ChargeList2 = props => {
  const { userStore } = useUser();
  const currentUser = userStore.currentUser;

  const [chargeList, setChargeList] = useState({
    id: props.location.pathname.split('/')[2]
  });
  const [charges, setCharges] = useState([]);
  const [form, setForm] = useState('');
  const [selectedCharge, setSelectedCharge] = useState(null);

  const handleNameChange = e => {
    setForm({ ...form, name: e.target.value });
  };

  const getChargeListData = id => {
    const chargesListsRef = db.collection('chargesLists');

    chargesListsRef
      .doc(chargeList.id)
      .get()
      .then(docSnap => {
        const chargeListOtherData = docSnap.data();
        setChargeList({ ...chargeList, ...chargeListOtherData });
      });
  };

  const getChargesData = () => {
    const collectionRef = db.collection(
      `/chargesLists/${chargeList.id}/charges`
    );

    collectionRef.get().then(snap => {
      const tmp = [];

      snap.docs.forEach(doc => {
        tmp.push({ id: doc.id, data: doc.data() });
      });

      setCharges(tmp);
    });
  };

  // ADD OR EDIT
  const addOrEditCharge = e => {
    e.preventDefault();

    const fields = document.querySelectorAll('.field input');

    const data = {};
    fields.forEach(field => {
      data[field.name] = field.value;
    });

    console.log(data); // todo: add image file here

    const mode = e.target.querySelector('input[type=submit]').value;

    if (mode === 'ADD') {
      const collectionRef = db.collection(
        `/chargesLists/${chargeList.id}/charges`
      );

      collectionRef.add(data).then(doc => {
        setCharges([...charges, { id: doc.id, data: data }]);
      });

      setForm('');
    } else {
      editCharge(selectedCharge.id, data);
    }
  };

  // EDIT
  const selectCharge = chargeId => {
    const selection = charges.filter(charge => charge.id === chargeId)[0];
    setSelectedCharge(selection);
    setForm({ ...form, name: selection.data.name });
  };

  const editCharge = (chargeId, data) => {
    db.collection(`/chargesLists/${chargeList.id}/charges`)
      .doc(chargeId)
      .set(data)
      .then(() => {
        console.log('Document successfully edited!');

        setCharges(
          charges.map(charge => {
            if (charge.id === chargeId) {
              return { ...charge, data };
            }
            return charge;
          })
        );

        setSelectedCharge(null);

        setForm({ ...form, name: '' });
      })
      .catch(error => {
        console.error('Error editing document: ', error);
      });
  };

  const clearForm = () => {
    setSelectedCharge(null);

    setForm('');
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setSelectedCharge(null);

    setForm('');
  };

  // DELETE
  const deleteCharge = chargeId => {
    db.collection(`/chargesLists/${chargeList.id}/charges`)
      .doc(chargeId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');

        setCharges(charges.filter(charge => charge.id !== chargeId));
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  useEffect(() => {
    getChargeListData();

    getChargesData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>ChargeList2 {chargeList.name}</h1>
      <p>{JSON.stringify(chargeList)}</p>
      <p>{JSON.stringify(charges)}</p>

      <form onSubmit={addOrEditCharge} className='add-or-remove-form'>
        <p>form: {JSON.stringify(form)}</p>
        <p>selectedCharge: {JSON.stringify(selectedCharge)}</p>

        <div className='fields'>
          <div className='field'>
            <label>chargeDate</label>
            <input
              // onChange={handleNameChange}
              name='chargeDate'
              type='date'
              // value={form ? form.name : ''}
            />
          </div>
          <div className='field'>
            <label>name</label>
            <input
              onChange={handleNameChange}
              name='name'
              type='text'
              value={form ? form.name : ''}
            />
          </div>
          <div className='field'>
            <label>chargeTotal</label>
            <input
              // onChange={handleNameChange}
              name='chargeTotal'
              type='number'
              // value={form ? form.name : ''}
            />
          </div>
          <div className='field'>
            <label>chargeImage</label>
            <input
              // onChange={handleNameChange}
              name='chargePercent'
              type='file'
              // value={form ? form.name : ''}
            />
          </div>
          <div className='field'>
            <label>chargePercent</label>
            <input
              // onChange={handleNameChange}
              name='chargePercent'
              type='number'
              // value={form ? form.name : ''}
            />
          </div>
        </div>

        <input
          type='submit'
          value={selectedCharge ? 'EDIT ' + selectedCharge.data.name : 'ADD'}
        />
        {selectedCharge && (
          <input onClick={handleCancel} type='button' value='CANCEL' />
        )}
      </form>

      <ul className='charges'>
        {charges.length &&
          charges.map(charge => (
            <Charge
              key={charge.id}
              charge={charge}
              deleteCharge={
                currentUser === chargeList.email ? deleteCharge : null
              }
              selectCharge={selectCharge}
            />
          ))}
      </ul>
    </div>
  );
};

export default ChargeList2;

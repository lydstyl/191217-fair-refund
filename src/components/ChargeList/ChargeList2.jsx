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
  const [form, setForm] = useState({
    chargeDate: '',
    chargeName: '',
    chargeFile: '',
    chargeTotal: '',
    chargePercent: ''
  });
  const [selectedCharge, setSelectedCharge] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    console.log('add or edit data', data); // todo: add image file here

    const mode = e.target.querySelector('input[type=submit]').value;

    if (mode === 'ADD') {
      // ADD
      const collectionRef = db.collection(
        `/chargesLists/${chargeList.id}/charges`
      );

      collectionRef.add(data).then(doc => {
        setCharges([...charges, { id: doc.id, data }]);
      });

      clearForm();
    } else {
      // EDIT
      editCharge(selectedCharge.id, data);
    }
  };

  // EDIT
  const selectCharge = chargeId => {
    const selection = charges.filter(charge => charge.id === chargeId)[0];
    const tmp = { ...selection.data };
    tmp.chargeFile = ''; // this input element accepts a filename, which may only be programmatically set to the empty string.

    setSelectedCharge(selection);

    setForm(tmp);
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

        clearForm();
      })
      .catch(error => {
        console.error('Error editing document: ', error);
      });
  };

  const clearForm = () => {
    const fields = document.querySelectorAll('.field input');

    const data = {};

    fields.forEach(field => {
      data[field.name] = '';
    });

    setForm(data);
    setSelectedCharge(null);
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

  const jsxForm = (
    <form onSubmit={addOrEditCharge} className='add-or-remove-form'>
      {/* <p>form: {JSON.stringify(form)}</p>
      <p>selectedCharge: {JSON.stringify(selectedCharge)}</p> */}

      <div className='fields'>
        <div className='field'>
          <label>chargeDate</label>
          <input
            onChange={handleChange}
            name='chargeDate'
            type='date'
            value={form ? form.chargeDate : ''}
          />
        </div>
        <div className='field'>
          <label>name</label>
          <input
            onChange={handleChange}
            name='chargeName'
            type='text'
            value={form ? form.chargeName : ''}
          />
        </div>
        <div className='field'>
          <label>chargeFile</label>
          <input
            onChange={handleChange}
            name='chargeFile'
            type='file'
            value={form ? form.chargeFile : ''}
          />
        </div>
        <div className='field'>
          <label>chargeTotal</label>
          <input
            onChange={handleChange}
            name='chargeTotal'
            type='number'
            value={form ? form.chargeTotal : ''}
          />
        </div>
        <div className='field'>
          <label>chargePercent</label>
          <input
            onChange={handleChange}
            name='chargePercent'
            type='number'
            value={form ? form.chargePercent : ''}
          />
        </div>
      </div>

      <input
        type='submit'
        value={
          selectedCharge ? 'EDIT ' + selectedCharge.data.chargeName : 'ADD'
        }
      />
      {selectedCharge && (
        <input onClick={handleCancel} type='button' value='CANCEL' />
      )}
    </form>
  );

  return (
    <div>
      <h1>ChargeList2 {chargeList.name}</h1>
      {/* <p>{JSON.stringify(chargeList)}</p>
      <p>{JSON.stringify(charges)}</p> */}

      {chargeList.email === currentUser && jsxForm}

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

import React, { useState, useEffect } from 'react';

import { db } from '../../utils/firebase/base';

import { useUser } from '../../reducers/useUser';

import FileUpload2 from '../FileUpload/FileUpload2';
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
  const [cloudinaryFile, setCloudinaryFile] = useState(null);
  const [totals, setTotals] = useState(null);

  //// UTILS
  const numOr0 = shouldBeNum => {
    // return a number or zero

    if (shouldBeNum * 0 === 0) {
      // is number or string number
      return parseFloat(shouldBeNum);
    }

    return 0;
  };

  const addToTotals = (addToTotalCharges, addToTotalRefunds) => {
    setTotals({
      totalCharges: numOr0(totals.totalCharges) + numOr0(addToTotalCharges),
      totalRefunds: numOr0(totals.totalRefunds) + numOr0(addToTotalRefunds)
    });
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

      const totalChargesReducer = (accumulator, currentValue) => {
        return numOr0(accumulator) + numOr0(currentValue.data.chargeTotal);
      };

      const totalRefundsReducer = (accumulator, currentValue) => {
        const { chargeTotal, chargePercent } = currentValue.data;
        const refund = numOr0(chargeTotal) * numOr0(chargePercent);

        return accumulator + refund;
      };

      setTotals({
        totalCharges: tmp.reduce(totalChargesReducer, 0),
        totalRefunds: tmp.reduce(totalRefundsReducer, 0)
      });

      setCharges(tmp);
    });
  };

  //// HANDLES
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD OR EDIT
  const addOrEditCharge = e => {
    e.preventDefault();

    const fields = document.querySelectorAll('.field input');

    const data = {};
    fields.forEach(field => {
      data[field.name] = field.value;
    });

    data.chargeImages = { ...cloudinaryFile };

    const mode = e.target.querySelector('input[type=submit]').value;

    if (mode === 'ADD') {
      // ADD
      const collectionRef = db.collection(
        `/chargesLists/${chargeList.id}/charges`
      );

      collectionRef.add(data).then(doc => {
        setCharges([...charges, { id: doc.id, data }]);

        const { chargeTotal, chargePercent } = data;
        addToTotals(chargeTotal, numOr0(chargePercent) * numOr0(chargeTotal));
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

    setCloudinaryFile({ ...selection.data.chargeImages });

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

        // calculate new totals
        // old percent and total
        const oldCharge = charges.filter(charge => charge.id === chargeId)[0]
          .data;
        // new are in data
        const diff = {
          chargeTotal: numOr0(data.chargeTotal) - numOr0(oldCharge.chargeTotal),
          chargePercent:
            numOr0(data.chargeTotal) * numOr0(data.chargePercent) -
            numOr0(oldCharge.chargeTotal) * numOr0(oldCharge.chargePercent)
        };
        addToTotals(diff.chargeTotal, diff.chargePercent);

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
    setCloudinaryFile(null);
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

        const chargeToBeDeleted = charges.filter(
          charge => charge.id === chargeId
        );

        const {
          data: { chargeTotal, chargePercent }
        } = chargeToBeDeleted[0];

        addToTotals(
          -numOr0(chargeTotal),
          -numOr0(chargePercent) * numOr0(chargeTotal)
        );
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
        <FileUpload2 setCloudinaryFile={setCloudinaryFile} />
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
      {/* <p>cloudinaryFile: {JSON.stringify(cloudinaryFile)}</p>
      <br />
      <p>chargeList: {JSON.stringify(chargeList)}</p>
      <br />
      <p>totals: {JSON.stringify(totals)}</p>
      <br />
      <p>charges: {JSON.stringify(charges)}</p>
      <br />
      <p>form: {JSON.stringify(form)}</p>
      <br />
      <p>selectedCharge: {JSON.stringify(selectedCharge)}</p> */}

      <h1>
        Liste de dépenses: {chargeList.name}{' '}
        {chargeList.email !== currentUser && 'de ' + chargeList.email}
      </h1>

      {totals && (
        <>
          <p>Total des charges: {totals.totalCharges}</p>
          <p>Remboursement demandé: {totals.totalRefunds}</p>
        </>
      )}

      {chargeList.email === currentUser && jsxForm}

      <ul className='charges'>
        {charges.length &&
          charges.map(charge => (
            <Charge
              key={charge.id}
              charge={charge}
              cloudinaryFile={cloudinaryFile}
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

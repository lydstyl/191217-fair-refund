import React, { useState, useEffect } from 'react';

import { db } from '../../utils/firebase/base';

import { useUser } from '../../reducers/useUser';

import Charge from '../Charge/Charge';

const ChargeList2 = props => {
  const { userStore } = useUser();
  const currentUser = userStore.currentUser;

  const [chargeList, setChargeList] = useState({
    id: props.location.pathname.split('/')[2]
  });
  const [charges, setCharges] = useState([]);

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

  // ADD
  const addCharge = e => {
    e.preventDefault();

    const nameInput = document.querySelector('[name=name]');
    const name = nameInput.value;

    const collectionRef = db.collection(
      `/chargesLists/${chargeList.id}/charges`
    );

    collectionRef.add({ name }).then(doc => {
      setCharges([...charges, { id: doc.id, data: { name } }]);
    });

    nameInput.value = '';
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

      <form onSubmit={addCharge}>
        <div>
          <label>name</label>
          <input name='name' type='text' />
          <input type='submit' value='ADD' />
        </div>
      </form>

      <ul>
        {charges.length &&
          charges.map(charge => (
            <Charge
              key={charge.id}
              charge={charge}
              deleteCharge={
                currentUser === chargeList.email ? deleteCharge : null
              }
            />
          ))}
      </ul>
    </div>
  );
};

export default ChargeList2;

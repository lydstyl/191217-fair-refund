import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../reducers/useUser';
import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Spinner from '../../images/spinner.gif';

import './ChargesLists.scss';

const ChargesLists = () => {
  const { userStore } = useUser();
  const email = userStore.currentUser;
  console.log(email);

  const { chargeStore, chargeDispatch } = useChargeCtx();
  console.log('component render ?!', chargeStore);

  useEffect(() => {
    const asyncFun = async () => {
      chargeDispatch({
        type: chargeActions.SET_LOADING.type,
        payload: true
      });

      const querySnapshot = await chargeActions.get_charges_lists_from_db.getChargesListCollectionRef(
        email
      );

      const chargesLists = [];
      querySnapshot.docs.forEach(doc => {
        chargesLists.push({
          id: doc.id,
          ...doc.data()
        });
      });

      chargeDispatch({
        type: chargeActions.SET_CHARGES_LISTS.type,
        payload: chargesLists
      });

      chargeDispatch({
        type: chargeActions.SET_LOADING.type,
        payload: false
      });
    };

    asyncFun();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {chargeStore.loading ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <>
          <h1>TEST</h1>
          <p>{JSON.stringify(chargeStore)}</p>
          {chargeStore.chargesLists.length && (
            <ul className='charges-lists'>
              {chargeStore.chargesLists.map(item => (
                <li key={item.id}>
                  <p>id: {item.id}</p>
                  <p>email: {item.email}</p>
                  <p>name: {item.name}</p>
                  <Link to={`/charge-list/${item.id}`}>
                    /charge-list/{item.id}
                  </Link>
                  {/* <button onClick={() => handleRemoveList(item.id)}>DEL</button> */}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ChargesLists;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../reducers/useUser';
import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Spinner from '../../images/spinner.gif';

import AddChargesList from '../AddChargesList/AddChargesList';

import './ChargesLists.scss';

const ChargesLists = () => {
  const { userStore } = useUser();
  const email = userStore.currentUser;

  const { chargeStore, chargeDispatch } = useChargeCtx();

  useEffect(() => {
    const asyncGetListsFromDB = async () => {
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

    asyncGetListsFromDB();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {chargeStore.loading ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <>
          <h1>Listes de dépenses</h1>

          {/* <p>{JSON.stringify(chargeStore)}</p> */}

          <AddChargesList />

          {chargeStore.chargesLists.length !== 0 && (
            <ul className='charges-lists'>
              {chargeStore.chargesLists.map(chargesList => (
                <li key={chargesList.id}>
                  <p>name: {chargesList.name}</p>
                  <Link to={`/charge-list/${chargesList.id}`}>
                    Voir les dépenses
                  </Link>

                  <Link
                    to={{
                      pathname: `/edit-charge-list/${chargesList.id}`,
                      chargesList
                    }}
                  >
                    EDIT
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default ChargesLists;

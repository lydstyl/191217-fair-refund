import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEye, FaEdit } from 'react-icons/fa';

import { useUser } from '../../reducers/useUser';
import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Spinner from '../../images/spinner.gif';

import AddChargesList from '../AddChargesList/AddChargesList';

import StyledChargeLists from './styledChargesLists';

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
    <StyledChargeLists>
      {chargeStore.loading ? (
        <img src={Spinner} alt='spinner' />
      ) : (
        <>
          <h1>Listes de dépenses</h1>

          <AddChargesList />

          {chargeStore.chargesLists.length !== 0 && (
            <ul>
              {chargeStore.chargesLists.map(chargesList => (
                <li key={chargesList.id}>
                  <p>{chargesList.name}</p>

                  <div className='links'>
                    <Link to={`/charge-list/${chargesList.id}`}>
                      <FaRegEye />
                    </Link>

                    <Link
                      to={{
                        pathname: `/edit-charge-list/${chargesList.id}`,
                        chargesList
                      }}
                    >
                      <FaEdit />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </StyledChargeLists>
  );
};

export default ChargesLists;

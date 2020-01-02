import React, { useContext, createContext, useReducer } from 'react';

import { db } from '../utils/firebase/base';

export const SET_INITIAL_CHARGES_LIST = 'SET_INITIAL_CHARGES_LIST';
export const ADD_CHARGES_LIST = 'ADD_CHARGES_LIST';
export const REMOVE_CHARGES_LIST = 'REMOVE_CHARGES_LIST';

export const SET_CURRENT_LIST_ID = 'SET_CURRENT_LIST_ID';
export const SET_CURRENT_LIST_NAME = 'SET_CURRENT_LIST_NAME';
export const SET_CURRENT_LIST_EMAIL = 'SET_CURRENT_LIST_EMAIL';
export const SET_CURRENT_LIST_CHARGES = 'SET_CURRENT_LIST_CHARGES';
export const ADD_CHARGE = 'ADD_CHARGE';
export const DELETE_CHARGE = 'DELETE_CHARGE';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INITIAL_CHARGES_LIST:
      return action.payload;

    case ADD_CHARGES_LIST:
      return {
        ...state,
        [action.payload.id]: {
          email: action.payload.email,
          name: action.payload.name
        }
      };

    case REMOVE_CHARGES_LIST:
      const newState = {};

      Object.keys(state)
        .filter(id => id !== action.payload)
        .forEach(id => {
          newState[id] = state[id];
        });

      return newState;

    case SET_CURRENT_LIST_NAME:
      console.log(SET_CURRENT_LIST_NAME);
      return { ...state, currentListName: action.payload };

    case SET_CURRENT_LIST_CHARGES:
      console.log(SET_CURRENT_LIST_CHARGES);

      let currentList = state[action.payload.id];

      if (currentList) {
        currentList.charges = action.payload.charges;
        console.log('newState without addExternalSharedList', {
          ...state,
          [action.payload.id]: currentList
        });
        return { ...state, [action.payload.id]: currentList };
      } else {
        // there is no currentList if we try to access it from an external shared list because we only have the lists created by the current user. We have to add it.

        const addExternalSharedListFromFirestore = () => {
          return new Promise((resolve, reject) => {
            // a Promise because we have to wait for firestore response
            try {
              const newState = { ...state };

              const docRef = db
                .collection('chargesLists')
                .doc(action.payload.id);

              docRef
                .get()
                .then(doc => {
                  if (doc.exists) {
                    const { email, name } = doc.data();

                    const docRef = db.collection(
                      `/chargesLists/${action.payload.id}/charges`
                    );

                    docRef.get().then(doc => {
                      const charges = [];

                      doc.docs.forEach(element => {
                        charges.push({ id: element.id, data: element.data() });
                      });

                      newState[action.payload.id] = { email, name, charges };

                      resolve(newState);
                    });
                  } else {
                    console.log('No such document!');
                  }
                })
                .catch(function(error) {
                  console.log('Error getting document:', error);
                });
            } catch (error) {
              reject(error);
            }
          });
        };

        const addExternalSharedList = async () => {
          const newState = await addExternalSharedListFromFirestore();
          console.log('newState after addExternalSharedList', newState);

          return newState;
        };

        return addExternalSharedList();
      }

    case ADD_CHARGE:
      console.log(ADD_CHARGE);

      state[action.payload.listId].charges.push({
        id: action.payload.chargeId,
        data: { name: action.payload.name }
      });

      return {
        ...state
      };

    case DELETE_CHARGE:
      console.log(DELETE_CHARGE);

      state[action.payload.chargesListId].charges = state[
        action.payload.chargesListId
      ].charges.filter(charge => charge.id !== action.payload.chargeId);

      return {
        ...state
      };

    default:
      return state;
  }
};

const initialState = {};

const Context = createContext();

export const useCharge = () => useContext(Context);

export const ChargeCtxProvider = ({ children }) => {
  const [chargeStore, chargeDispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ chargeDispatch, chargeStore }}>
      {children}
    </Context.Provider>
  );
};

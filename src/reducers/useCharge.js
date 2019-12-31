import React, { useContext, createContext, useReducer } from 'react';

import { db } from '../utils/firebase/base';

export const ADD_CHARGES_LIST = 'ADD_CHARGES_LIST';
export const REMOVE_CHARGES_LIST = 'REMOVE_CHARGES_LIST';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CHARGES_LIST:
      return [
        ...state,
        {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name
        }
      ];
    case REMOVE_CHARGES_LIST:
      return state.filter(list => list.id !== action.payload);

    default:
      return state;
  }
};

const initialState = [];

db.collection('chargesLists') // only the user's list
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      initialState.push({
        id: doc.id,
        email: doc.data().email,
        name: doc.data().name
      });
    });
  });

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

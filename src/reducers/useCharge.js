import React, { useContext, createContext, useReducer } from 'react';

import { db } from '../utils/firebase/base';

export const ADD_CHARGES_LIST = 'ADD_CHARGES_LIST';
export const REMOVE_CHARGES_LIST = 'REMOVE_CHARGES_LIST';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CHARGES_LIST:
      return [...state, { id: action.payload.id, email: action.payload.email }];
    case REMOVE_CHARGES_LIST:
      return state.filter(list => list.id !== action.payload);

    default:
      return state;
  }
};

const initialState = []; // [{id: xxxfromfirebase, email: yyy}, ...]

db.collection('users')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      initialState.push({ id: doc.id, email: doc.data().email });
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

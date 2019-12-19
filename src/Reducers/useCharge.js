import React, { useContext, createContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CHARGES_LIST':
      return [...state, action.payload];
    case 'REMOVE_CHARGES_LIST':
      return state.filter(list => list.id !== action.payload);

    default:
      return state;
  }
};

const initialState = [
  { id: 'idOne', name: 'one' },
  { id: 'idTwo', name: 'two' }
];
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

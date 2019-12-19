import React, { useContext, createContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_CHARGES_LISTS':
      return initialState;

    default:
      return state;
  }
};

const initialState = { chargesList: ['one', 'two'] };
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

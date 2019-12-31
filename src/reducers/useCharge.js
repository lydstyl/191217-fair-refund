import React, { useContext, createContext, useReducer } from 'react';

export const ADD_CHARGES_LIST = 'ADD_CHARGES_LIST';
export const REMOVE_CHARGES_LIST = 'REMOVE_CHARGES_LIST';

const reducer = (state, action) => {
  switch (action.type) {
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

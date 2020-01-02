import React, { useContext, createContext, useReducer } from 'react';

export const SET_INITIAL_CHARGES_LIST = 'SET_INITIAL_CHARGES_LIST';
export const ADD_CHARGES_LIST = 'ADD_CHARGES_LIST';
export const REMOVE_CHARGES_LIST = 'REMOVE_CHARGES_LIST';

export const SET_CURRENT_LIST_ID = 'SET_CURRENT_LIST_ID';
export const SET_CURRENT_LIST_NAME = 'SET_CURRENT_LIST_NAME';
export const SET_CURRENT_LIST_EMAIL = 'SET_CURRENT_LIST_EMAIL';
export const SET_CURRENT_LIST_CHARGES = 'SET_CURRENT_LIST_CHARGES';
export const ADD_CHARGE = 'ADD_CHARGE';

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

      const currentList = state[action.payload.id];
      currentList.charges = action.payload.charges;

      return { ...state, [action.payload.id]: currentList };

    case ADD_CHARGE:
      console.log(ADD_CHARGE);

      console.log('action.payload', action.payload);
      state[action.payload.listId].charges.push({
        id: action.payload.chargeId, // Undefined why ?
        data: { name: action.payload.name }
      });
      console.log(JSON.stringify({ ...state }, null, 4));

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

import React, { useContext, createContext, useReducer } from 'react';

export const SET_LOADING = 'SET_LOADING';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      console.log(SET_LOADING);

      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

const initialState = { loading: false };

const Context = createContext();

export const useLoading = () => useContext(Context);

export const LoadingCtxProvider = ({ children }) => {
  const [loadingStore, loadingDispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ loadingDispatch, loadingStore }}>
      {children}
    </Context.Provider>
  );
};

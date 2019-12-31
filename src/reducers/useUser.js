import React, { useContext, createContext, useReducer, useEffect } from 'react';

import app from '../utils/firebase/base';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(SET_CURRENT_USER);
      return { currentUser: action.payload };
    default:
      return state;
  }
};

const initialState = { currentUser: null };
const Context = createContext();

export const useUser = () => useContext(Context);

export const UserCtxProvider = ({ children }) => {
  const [userStore, userDispatch] = useReducer(reducer, initialState);

  const setCurrentUser = currentUser => {
    let email = null;
    if (currentUser) {
      email = currentUser.email;
    }

    userDispatch({
      type: SET_CURRENT_USER,
      payload: email
    });
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <Context.Provider value={{ userDispatch, userStore }}>
      {children}
    </Context.Provider>
  );
};

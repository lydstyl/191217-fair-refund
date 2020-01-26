import React, { useContext, createContext, useReducer } from 'react';

import reducer from './reducer';

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'en');
}
if (!localStorage.getItem('color')) {
  localStorage.setItem('color', 'blue');
}

const initialState = {
  lang: localStorage.getItem('lang'),

  languages: { en: 'en', fr: 'fr' }
};

const Context = createContext();

// CONTEXT
export const useSettingsCtx = () => useContext(Context);

// CONTEXT PROVIDER
export const SettingsCtxProvider = ({ children }) => {
  const [settingsStore, settingsDispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ settingsDispatch, settingsStore }}>
      {children}
    </Context.Provider>
  );
};

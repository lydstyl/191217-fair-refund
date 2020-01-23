import React, { useContext, createContext, useReducer } from 'react';

import reducer from './reducer';

const initialState = {
  // loading: false,

  lang: 'en',
  // color: 'blue',

  languages: { en: 'en', fr: 'fr' }

  // colors: {
  //   blue: {
  //     white: '#FAFAFA',
  //     black: '#212121',
  //     primary: '#2196F3',
  //     primaryLight: '#BBDEFB',
  //     primaryDark: '#0D47A1',
  //     secondary: '#E040FB',
  //     secondaryLight: '#EA80FC'
  //   },
  //   yellow: {
  //     white: '#FAFAFA',
  //     black: '#212121',
  //     primary: '#2196F3',
  //     primaryLight: '#BBDEFB',
  //     primaryDark: '#0D47A1',
  //     secondary: '#E040FB',
  //     secondaryLight: '#EA80FC'
  //   },
  //   red: {
  //     white: '#FAFAFA',
  //     black: '#212121',
  //     primary: '#2196F3',
  //     primaryLight: '#BBDEFB',
  //     primaryDark: '#0D47A1',
  //     secondary: '#E040FB',
  //     secondaryLight: '#EA80FC'
  //   }
  // }
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

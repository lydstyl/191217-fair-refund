import React, { useState } from 'react';

import txt from './translations';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';

import settingsActions from '../../context/useSettings/settingsActions';

const Settings = () => {
  const { settingsStore, settingsDispatch } = useSettingsCtx();
  const { lang, selectedColor } = settingsStore;

  const handleLangChange = e => {
    settingsDispatch({
      type: settingsActions.SET_LANGUAGE.type,
      payload: e.target.value
    });
  };

  const handleColorChange = e => {
    console.log(e.target.value);
  };

  return (
    <>
      <h1>{txt.settings[lang]}</h1>

      <form>
        <div className='field'>
          <label>{txt.language[lang]}</label>
          <select onChange={handleLangChange} name='langage'>
            <option value='en'>{txt.english[lang]}</option>
            <option value='fr'>{txt.french[lang]}</option>
          </select>
        </div>

        <div className='field'>
          <label>{txt.changeColor[lang]}</label>
          <select onChange={handleColorChange} name='langage'>
            <option value='blue'>{txt.blue[lang]}</option>
            <option value='yellow'>{txt.yellow[lang]}</option>
            <option value='red'>{txt.red[lang]}</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default Settings;

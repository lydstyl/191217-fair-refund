import React from 'react';

import txt from './translations';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';
import settingsActions from '../../context/useSettings/settingsActions';

import StyledSettings from './StyledSettings';

const Settings = () => {
  const { settingsStore, settingsDispatch } = useSettingsCtx();
  const { lang } = settingsStore;

  const handleLangChange = e => {
    // loading true

    // set the language db users --> id, email, settings {lang: 'en', color:'blue'}
    // when login check if we have a user settings, if yes SET_LANGUAGE & SET_COLOR just after SET_CURRENT_USER

    settingsDispatch({
      type: settingsActions.SET_LANGUAGE.type,
      payload: e.target.value
    });

    localStorage.setItem('lang', e.target.value);

    // loading false
  };

  const handleColorChange = e => {
    localStorage.setItem('color', e.target.value);
    // document.location.reload(true);
    document.location.reload();
  };

  return (
    <StyledSettings>
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
            <option value=''>--{txt.choose[lang]}--</option>
            <option value={txt.blue['en']}>{txt.blue[lang]}</option>
            <option value={txt.green['en']}>{txt.green[lang]}</option>
            <option value={txt.brown['en']}>{txt.brown[lang]}</option>
          </select>
        </div>
      </form>
    </StyledSettings>
  );
};

export default Settings;

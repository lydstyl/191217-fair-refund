import React from 'react';

import txt from './translations';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';

import LanguageSelector from './LanguageSelector';

import StyledSettings from './StyledSettings';

const Settings = () => {
  const { settingsStore } = useSettingsCtx();
  const { lang } = settingsStore;

  const handleColorChange = e => {
    localStorage.setItem('color', e.target.value);
    document.location.reload();
  };

  return (
    <StyledSettings>
      <h1>{txt.settings[lang]}</h1>

      <form>
        <div className='field'>
          <label>{txt.language[lang]}</label>
          <LanguageSelector />
        </div>

        <div className='field'>
          <label>{txt.changeColor[lang]}</label>
          <select
            defaultValue={localStorage.getItem('color')}
            onChange={handleColorChange}
            name='langage'
          >
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

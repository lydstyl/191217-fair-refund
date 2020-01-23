import React from 'react';
import styled from 'styled-components';

import txt from './translations';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';
import settingsActions from '../../context/useSettings/settingsActions';

import { buttons } from '../../utils/style/variables';

const StyledLangageSelector = styled.select`
  ${buttons.button1};
  display: inline;
  margin: 0;
`;

export const LanguageSelector = () => {
  const {
    settingsStore: { lang },
    settingsDispatch
  } = useSettingsCtx();

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

  return (
    <StyledLangageSelector onChange={handleLangChange} name='langage'>
      <option value=''>--{txt.selectLanguage[lang]}--</option>
      <option value='en'>{txt.english[lang]}</option>
      <option value='fr'>{txt.french[lang]}</option>
    </StyledLangageSelector>
  );
};

export default LanguageSelector;

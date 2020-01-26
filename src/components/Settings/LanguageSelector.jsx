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
    settingsDispatch({
      type: settingsActions.SET_LANGUAGE.type,
      payload: e.target.value
    });

    localStorage.setItem('lang', e.target.value);
  };

  return (
    <StyledLangageSelector
      defaultValue={lang}
      onChange={handleLangChange}
      name='langage'
    >
      <option value='en'>{txt.english[lang]}</option>
      <option value='fr'>{txt.french[lang]}</option>
    </StyledLangageSelector>
  );
};

export default LanguageSelector;

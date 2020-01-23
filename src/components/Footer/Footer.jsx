import React from 'react';

import styled from 'styled-components';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';

import txt from './translations';

import {
  device,
  spaces,
  fontSizes,
  colors,
  shadows
} from '../../utils/style/variables';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${spaces.large};
  padding: ${spaces.medium};
  font-size: ${fontSizes.small};
  background-color: ${colors.lightgrey};
  text-align: center;

  ${shadows.header};

  @media ${device.tablet} {
    padding: ${spaces.large};
  }
`;

const Footer = () => {
  const { settingsStore } = useSettingsCtx();
  const { lang } = settingsStore;

  return <StyledFooter>{txt.aComment[lang]}</StyledFooter>;
};

export default Footer;

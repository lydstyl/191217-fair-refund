import React from 'react';

import styled from 'styled-components';

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
  return (
    <StyledFooter>
      Un commentaire ? envoyer le sous la vidéo Youtube de cette application ou
      en privé sur lydstyl@gmail.com
    </StyledFooter>
  );
};

export default Footer;

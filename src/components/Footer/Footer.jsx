import React from 'react';

import styled from 'styled-components';

import { device, spaces, fontSizes, colors } from '../../utils/style/variables';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${spaces.medium};
  padding: ${spaces.medium};
  font-size: ${fontSizes.small};
  color: ${colors.darkgrey};
  background-color: ${colors.lightgrey};
  text-align: center;

  @media ${device.tablet} {
    padding: ${spaces.large};
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        Un commentaire ? envoyer le sous la vidéo Youtube de cette application
        ou en privé sur lydstyl@gmail.com
      </div>
    </StyledFooter>
  );
};

export default Footer;

import styled from 'styled-components';

import { spaces, fontSizes, colors } from '../../utils/style/variables';

const DefaultCss = styled.div`
  font-size: ${fontSizes.medium};
  color: ${colors.blue};

  h1 {
    margin: ${spaces.large} 0;
    color: ${colors.violet};
    font-family: 'Alata';
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: ${colors.violet};
  }

  a:visited {
    color: ${colors.violet};
  }

  input {
    text-align: center;
    border: none;
    border-bottom: 1px solid ${colors.black};
    background-color: ${colors.white};
  }

  img {
    border-radius: 3px;
  }

  [alt='spinner'] {
    display: block;
    margin: 100px auto auto;
  }

  svg {
    font-size: ${fontSizes.large};
  }
`;

export default DefaultCss;

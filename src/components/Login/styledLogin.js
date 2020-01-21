import styled from 'styled-components';

import {
  device,
  spaces,
  fontSizes,
  buttons,
  colors
} from '../../utils/style/variables';

const StyledLogin = styled.div`
  h1 {
    font-size: ${fontSizes.large};
    margin: ${spaces.large} 0;
    color: ${colors.violet};
  }

  form {
    .field {
      display: flex;
      justify-content: space-between;
      margin: ${spaces.medium} 0;
      input {
        width: 60%;
      }
    }

    button {
      ${buttons.button1};
      display: block;
      width: 100%;
      margin: ${spaces.large} auto;
      font-size: ${fontSizes.large};
      background-color: ${colors.violet};
    }
  }

  @media ${device.laptop} {
    form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: ${spaces.medium};
      font-size: ${fontSizes.large};

      .field {
        justify-content: flex-start;

        label:nth-child(1) {
          color: ${colors.darkgrey};
        }
        .field:nth-child(2) {
          grid-column: 3;
          grid-column: 2;
        }
        input {
          margin: 0 ${spaces.medium};
          text-align: center;
        }
      }
      button {
        display: inline;
        width: 100px;
        margin: ${spaces.medium} 0;
        grid-column: 2;
        grid-row: 2;
      }
    }
  }
`;

export default StyledLogin;

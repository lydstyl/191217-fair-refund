import styled from 'styled-components';

import {
  device,
  spaces,
  fontSizes,
  buttons,
  colors
} from '../../utils/style/variables';

const styledEditList = styled.div`
  form > *,
  form + button {
    margin-top: ${spaces.large};
  }
  .field {
    font-size: ${fontSizes.medium};
    color: ${colors.blue};
  }
  [type='text'] {
    width: 100%;
    margin-top: ${spaces.medium};
  }

  [type='number'] {
    margin: ${spaces.medium};
  }

  button {
    ${buttons.button1};
    font-size: ${fontSizes.large};
    background-color: ${colors.violet};
  }

  @media ${device.tablet} {
    .field {
      display: flex;
      justify-content: space-between;
      margin: ${spaces.large} auto;
      max-width: 600px;
    }
    label {
      margin: ${spaces.medium};
    }
    [type='text'] {
      width: auto;
      min-width: 400px;
      margin: ${spaces.medium};
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      width: 300px;
      margin: ${spaces.large} auto;
    }
  }
`;

export default styledEditList;

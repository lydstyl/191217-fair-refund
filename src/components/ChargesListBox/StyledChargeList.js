import styled from 'styled-components';

import {
  device,
  spaces,
  fontSizes,
  buttons,
  colors
} from '../../utils/style/variables';

const StyledChargeList = styled.div`
  * {
    margin-top: ${spaces.large};
  }
  form {
    * {
      margin-top: ${spaces.medium};
      input {
        width: 100%;
        margin-top: 0;
      }
    }
    .field {
      img {
        display: block;
        max-width: 200px;
        margin: ${spaces.medium} auto;
      }
    }
  }
`;

export default StyledChargeList;

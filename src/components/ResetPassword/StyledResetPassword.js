import styled from 'styled-components';

import { device, spaces, buttons } from '../../utils/style/variables';

const StyledResetPassword = styled.div`
  [type='submit'] {
    ${buttons.button1}
  }

  @media ${device.tablet} {
    width: 400px;
    margin: auto;

    .field {
      margin: ${spaces.large} 0;

      input {
        margin-left: ${spaces.medium};
      }
    }
  }
`;

export default StyledResetPassword;

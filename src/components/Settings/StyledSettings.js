import styled from 'styled-components';

import { buttons, spaces, device } from '../../utils/style/variables';

const StyledSettings = styled.div`
  max-width: 500px;
  margin: 0 auto;

  .field {
    margin: ${spaces.large} 0;

    select {
      ${buttons.button1};
      display: inline;
      max-width: 230px;
      margin-left: ${spaces.medium};
    }
  }
  @media ${device.tablet} {
    /* min-height: calc(100vh - 350px); */
  }
`;

export default StyledSettings;

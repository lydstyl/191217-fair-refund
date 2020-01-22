import styled from 'styled-components';

import { size, spaces, device } from '../../utils/style/variables';

const StyledContainer = styled.div`
  max-width: ${size.laptop};
  margin: auto;
  padding: 0 ${spaces.medium};

  /* sticky-footer */
  min-height: calc(100vh - 300px);

  @media ${device.tablet} {
    min-height: calc(100vh - 350px);
  }
`;

export default StyledContainer;

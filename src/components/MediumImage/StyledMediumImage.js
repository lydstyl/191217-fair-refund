import styled from 'styled-components';

import {
  spaces,
  colors,
  fontSizes,
  shadows
} from '../../utils/style/variables';

const StyledMediumImage = styled.div`
  max-width: 760px;
  margin: ${spaces.large} auto;
  padding: ${spaces.medium};
  text-align: center;
  background-color: ${colors.lightgrey};
  color: ${colors.darkgrey};
  border-radius: 3px;
  ${shadows.buttonActive};

  * {
    margin: ${spaces.medium} auto;
  }

  .back {
    font-size: ${fontSizes.large};
    svg {
      margin-bottom: -8px;
    }
  }

  img {
    max-width: 100%;
  }
  span {
    font-size: ${fontSizes.large};
  }
  .strong {
    color: ${colors.violet};
  }
`;

export default StyledMediumImage;

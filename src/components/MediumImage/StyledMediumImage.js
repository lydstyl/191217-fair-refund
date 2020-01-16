import styled from 'styled-components';

import {
  // device,
  spaces,
  // fontSizes,
  // buttons,
  colors,
  fontSizes
} from '../../utils/style/variables';

const StyledMediumImage = styled.div`
  text-align: center;
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

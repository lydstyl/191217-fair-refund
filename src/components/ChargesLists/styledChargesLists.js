import styled from 'styled-components';

import {
  device,
  spaces,
  fontSizes,
  buttons,
  colors
} from '../../utils/style/variables';

const StyledChargeLists = styled.div`
  h1 {
    margin: ${spaces.large} 0;
    /* text-align: center; */
  }

  .field {
    [type='text'] {
      width: 100%;
      font-size: ${fontSizes.large};
    }
    button {
      ${buttons.button1}
      margin: ${spaces.medium} ${spaces.medium} ${spaces.large} 0;
      background-color: ${colors.violet};
  }
  
}

li {
  display: flex;
  justify-content: space-between;
  margin: ${spaces.large} 0;

  .links a{
    margin-left: ${spaces.medium};
    color: ${colors.blue};
    svg{
      font-size: ${fontSizes.medium};

    }
  }
}

@media ${device.tablet}{
    .field {
      display: flex;
      flex-direction: row;
      margin: ${spaces.large} 0;

      [type='text'] {
        width: auto;
        min-width: 400px;
      }

      button{
        margin: 0 ${spaces.large};
      }
    }
}

@media ${device.laptop}{
  li{
    flex-direction: row-reverse;
    justify-content: flex-end;

    .links a{
      margin: 0;
      margin-right: ${spaces.large};
    }
  }
}
`;

export default StyledChargeLists;

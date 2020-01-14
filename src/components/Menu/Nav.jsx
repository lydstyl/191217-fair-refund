import styled from 'styled-components';

import {
  device,
  spaces,
  fontSizes,
  colors,
  buttons
} from '../../utils/style/variables';

const Nav = styled.nav`
  display: flex;
  min-height: 50px;
  margin-bottom: ${spaces.medium};

  justify-content: center;
  align-items: center;
  align-items: flex-start;

  font-size: ${fontSizes.large};

  background: lightgrey;

  .menuButton {
    display: block;
    margin-top: 50px;
    transform: translateY(-25px);
  }
  .menuList {
    position: absolute;
    left: 0;

    display: none;
    flex-direction: column;
    justify-content: space-evenly;

    width: 100%;
    height: 100vh;
    background: ${colors.light2};

    .menuClose {
      position: absolute;
      top: ${spaces.medium};
      right: ${spaces.medium};
    }

    a
     {
      ${buttons.button1}
      margin: 0 ${spaces.medium}; 
    }
    .userBox div{
      font-size: ${fontSizes.medium};
      color: ${colors.violet}
    }
    .userBox button{
      ${buttons.button1}
    }
  }
  @media ${device.tablet} {
    .menuButton {
      display: none;
    }
    .menuList {
      .menuClose {
        display: none;
      }

      position: relative;

      display: flex;
      flex-direction: row;
      align-items: center;

      width: 100%;
      max-height: 100px;

      .userBox {
        display: flex;
        align-items: center;

        button {
          margin: 0 0 0 ${spaces.medium};
        }
      }
    }
  }
`;

export default Nav;

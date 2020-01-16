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

  min-height: 80px;
  margin-bottom: ${spaces.medium};
  padding: ${spaces.medium};

  justify-content: center;
  align-items: right;
  align-items: flex-start;

  font-size: ${fontSizes.large};

  color: ${colors.darkgrey};
  background: lightgrey;
  
  .menuButton {
    ${buttons.button1};
    position: absolute;
    top: ${spaces.medium};
    right: ${spaces.medium};
    display: block;
    width: auto;
    margin: 0;

    /* for sticky footer */
    /* transform: translateY(-25px); */
  }
  .menuList {
    position: absolute;
    left: 0;
    padding:  ${spaces.medium};

    display: none;
    flex-direction: column;
    justify-content: space-evenly;

    width: 100%;
    height: 100vh;
    background: ${colors.lightgrey};

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
    .userBox {
      display: flex;
      flex-direction: column;
      margin: 0;
      text-align: center;

      div{
        font-size: ${fontSizes.medium};
        color: ${colors.darkgrey}
      }
      button{
        ${buttons.button1}
      }
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
      .userBox{
        flex-direction: row;
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

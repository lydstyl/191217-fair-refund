import styled from 'styled-components';

export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

const Nav = styled.nav`
  display: flex;
  min-height: 50px;
  margin-bottom: 20px;

  justify-content: center;
  align-items: center;
  align-items: flex-start;

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

    height: 100vh;
    background: darkgrey;

    .menuClose {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 40px;
    }

    a,
    .userBox {
      margin: 0 20px;
      text-decoration: none;
      color: white;

      button {
        margin-top: 20px;
        padding: 10px 20px;
        border: none;
        border-radius: 3px;
        color: white;
        background: purple;
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
          margin: 0 0 0 20px;
        }
      }
    }
  }
`;

export default Nav;

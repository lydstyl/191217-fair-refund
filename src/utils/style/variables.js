export const size = {
  mobileS: '320px',
  tablet: '768px',
  laptop: '1366px',
  desktop: '1920px'
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`
};

export const spaces = {
  small: '10px',
  medium: '20px',
  large: '40px'
};

export const fontSizes = {
  small: '0.7rem',
  medium: '1rem',
  large: '2rem'
};

export const colors = {
  white: 'white',
  black: 'black',

  lightgrey: 'lightgrey',
  darkgrey: 'darkgrey',

  blue: 'royalblue',

  violet: 'blueviolet'
};

export const shadows = {
  header: 'box-shadow: 4px 9px 20px 10px rgba(0,0,0,.2);',
  button: 'box-shadow: 5px 5px 10px 5px rgba(0,0,0,.3);',
  buttonHover: 'box-shadow: 10px 20px 20px 10px rgba(0,0,0,.3);',
  buttonActive: 'box-shadow: 2px 2px 4px 2px rgba(0,0,0,.3);'
};

export const buttons = {
  button1: `
    // display: flex;
    display: block;
    align-items: center;
    width: 100%
    margin-top: ${spaces.medium};
    padding: ${spaces.small} ${spaces.medium};
    line-height: ${fontSizes.medium}
    font-size: ${fontSizes.medium}
    text-decoration: none;
    color: ${colors.white};
    align-self: center;
    text-align: center;
    border: none;
    background: ${colors.blue};
    border-radius: 3px;
    ${shadows.button}
    transition: 0.3s;

    :hover{
      ${shadows.buttonHover}
    }
    
    :active{
      ${shadows.buttonActive}
    }

    svg{
      margin: auto;
    }

    @media ${device.tablet}{
      width: auto;
    }
  `
};

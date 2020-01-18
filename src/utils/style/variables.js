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
  shadow1: 'box-shadow: 4px -10px 20px 20px rgba(0,0,0,.3);',
  shadow2: 'box-shadow: 5px 5px 10px 3px rgba(0,0,0,.3);',
  shadow3: 'box-shadow: 10px 10px 10px 3px rgba(0,0,0,.3);',
  shadowActive: 'box-shadow: 2px 2px 10px 3px rgba(0,0,0,.3);'
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
    ${shadows.shadow2}
    transition: 0.3s;

    :hover{
      ${shadows.shadow3}
    }
    
    :active{
      ${shadows.shadowActive}
    }

    svg{
      margin: auto;
    }

    @media ${device.tablet}{
      width: auto;
    }
  `
};

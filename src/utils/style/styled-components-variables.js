export const size = {
  mobileS: '320px',
  // mobileM: '375px',
  // mobileL: '425px',
  tablet: '768px',
  // laptop: '1024px',
  laptop: '1366px',
  // laptopL: '1440px',
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
  small: '0,5rem',
  medium: '1rem',
  large: '2rem'
};

export const colors = {
  light1: 'white',
  light2: 'lightgrey',
  dark1: 'darkgrey',
  dark2: 'black'
};

export const buttons = {
  button1: `
    margin-top: ${spaces.medium};
    padding: ${spaces.small} ${spaces.medium};
    border: none;
    border-radius: 3px;
    color: ${colors.light1};
    background: purple;
  `
};

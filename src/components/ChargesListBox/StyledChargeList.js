import styled from 'styled-components';

import {
  device,
  spaces,
  // fontSizes,
  buttons,
  colors
} from '../../utils/style/variables';

const StyledChargeList = styled.div`
  * {
    margin-top: ${spaces.large};
  }
  p {
    color: ${colors.blue};
  }
  form {
    * {
      margin-top: ${spaces.medium};
      input {
        width: 100%;
        margin-top: 0;
      }
    }
    .field {
      img {
        display: block;
        max-width: 200px;
        margin: ${spaces.medium} auto;
      }
    }
    [type='submit'] {
      ${buttons.button1};
      background-color: ${colors.violet};
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: ${spaces.medium};

    li {
      position: relative;
      margin: 0;
      padding-bottom: 80px;
      list-style-type: none;
      text-align: center;
      border: 1px solid;
      background-color: ${colors.lightgrey};
      border-radius: 3px;

      * {
        margin-top: 0;
        margin-bottom: ${spaces.medium};
      }
      h2 {
        text-align: center;
        margin-top: ${spaces.medium};
      }
      img {
        width: 200px;
        border: 3px solid white;
      }
      .date {
        color: ${colors.darkgrey};
      }

      .button-box {
        position: absolute;
        bottom: 0;
        left: calc(100% / 2 - 260px / 2);
        display: flex;
        justify-content: space-between;
        width: 260px;
        margin: auto;
        padding: ${spaces.small};

        a,
        button {
          ${buttons.button1};
          width: 72px;
        }
      }
    }
  }

  @media ${device.tablet} {
    form {
      .field {
        display: flex;
        label {
          width: 230px;
          margin: 0;
        }
        input {
          width: calc(100% - 230px);
        }
      }
      [type='submit'] {
        width: 100px;
      }
    }

    ul {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media ${device.tablet} {
    form {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: ${spaces.small};

      .field {
        display: block;
        max-width: 100%;
        min-height: 40px;
        line-height: 40px;
        label {
          width: auto;
        }
        input {
          width: 100%;
          margin-left: 0 !important;
          margin-left: ${spaces.small};
        }
      }
      .field:nth-child(1) {
        grid-column: 1 / 4;
        grid-row: 1;
      }
      .field:nth-child(2) {
        grid-column: 4;
        grid-row: 1;
      }
      .field:nth-child(3) {
        grid-column: 5/7;
        grid-row: 1;
      }
      .field:nth-child(4) {
        grid-column: 5;
        grid-row: 2;
      }
      .field:nth-child(5) {
        grid-column: 1 / 4;
        grid-row: 2;
      }

      [type='submit'] {
        grid-column: 6;
        grid-row: 2;
        display: block;
        margin: auto;
        margin-top: 60px;
      }
    }
  }
  @media ${device.laptop} {
    form {
      grid-gap: ${spaces.large};
    }
    ul {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;

export default StyledChargeList;

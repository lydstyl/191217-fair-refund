import React from 'react';
import { ClockLoader } from 'react-spinners';
import { css } from '@emotion/core';

import { colors } from '../../utils/style/variables';

const override = css`
  display: block;
  margin: 130px auto;
`;

const Spinner = () => {
  return (
    <div className='spinner'>
      <ClockLoader
        loading={true}
        css={override}
        size={200}
        color={colors.violet}
      />
    </div>
  );
};

export default Spinner;

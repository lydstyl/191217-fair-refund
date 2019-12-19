import React from 'react';

import { useCharge } from '../../Reducers/useCharge';

const ChargesLists = () => {
  const { chargeStore, chargeDispatch } = useCharge();

  return (
    <div>
      <p>{JSON.stringify(chargeStore)}</p>

      {/* <button onClick={() => chargeDispatch({ type: 'GET_CHARGES_LISTS' })}>
        GET_CHARGES_LISTS
      </button> */}
    </div>
  );
};

export default ChargesLists;

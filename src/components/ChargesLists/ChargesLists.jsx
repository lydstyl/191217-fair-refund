import React from 'react';

import { useCharge } from '../../Reducers/useCharge';

const ChargesLists = () => {
  const { chargeStore, chargeDispatch } = useCharge();

  return (
    <div>
      <p>{JSON.stringify(chargeStore)}</p>

      <button
        onClick={() =>
          chargeDispatch({
            type: 'ADD_CHARGES_LIST',
            payload: { id: 'idFour', name: 'four' }
          })
        }
      >
        ADD_CHARGES_LIST
      </button>

      <button
        onClick={() =>
          chargeDispatch({ type: 'REMOVE_CHARGES_LIST', payload: 'idTwo' })
        }
      >
        REMOVE_CHARGES_LIST
      </button>
    </div>
  );
};

export default ChargesLists;

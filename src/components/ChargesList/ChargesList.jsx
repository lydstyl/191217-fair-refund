import React from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';

const ChargesList = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();
  const { chargesList } = chargeStore.chargesList;

  return (
    <div>
      <ul>
        {chargesList &&
          chargesList.map(charge => (
            <li key={charge.chargeId}>
              <pre>{JSON.stringify(charge, null, 4)}</pre>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChargesList;

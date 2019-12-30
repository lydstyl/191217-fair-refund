import React from 'react';

import {
  useCharge
  // ADD_CHARGES_LIST,
  // REMOVE_CHARGES_LIST
} from '../../reducers/useCharge';

const ChargeList = props => {
  const { chargeStore, chargeDispatch } = useCharge();

  const listId = props.location.pathname.split('/')[2];

  return (
    <div>
      <h1>ChargeList </h1>

      <div>id: {listId}</div>
    </div>
  );
};

export default ChargeList;

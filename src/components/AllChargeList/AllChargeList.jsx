import React, { useContext, useEffect, useState } from 'react';

import { ChargeListContext } from '../ChargeListProvider/ChargeListProvider';
import ChargeListItem from '../ChargeListItem/ChargeListItem';

const AllChargeList = () => {
  const { chargeList } = useContext(ChargeListContext);

  const [stateChargeList, setstateChargeList] = useState([]);

  useEffect(() => {
    setstateChargeList(chargeList);
  }, [chargeList]);

  return (
    <div>
      <ul>
        {stateChargeList &&
          stateChargeList.map(list => (
            <li key={list.id}>
              <ChargeListItem user={list} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllChargeList;

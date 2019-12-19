import React, { useContext, useEffect, useState } from 'react';

import { ChargeListContext } from '../ChargeListProvider/ChargeListProvider';

const Test = () => {
  const { chargeList } = useContext(ChargeListContext);

  const [stateChargeList, setstateChargeList] = useState([]);

  useEffect(() => {
    console.log(chargeList, 'youpi');

    setstateChargeList(chargeList);
  }, [chargeList]);

  return (
    <div>
      <ul>
        {stateChargeList &&
          stateChargeList.map(list => <li key={list.id}>{list.email}</li>)}
      </ul>
    </div>
  );
};

export default Test;

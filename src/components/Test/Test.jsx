import React, { useContext } from 'react';

import { ChargeListContext } from '../ChargeListProvider/ChargeListProvider';

const Test = () => {
  const { chargeList } = useContext(ChargeListContext);

  console.log(chargeList, 'youpi');

  return <div>test</div>;
};

export default Test;

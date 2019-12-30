import React, { useState } from 'react';

import { db } from '../../utils/firebase/base';

const ChargeList2 = () => {
  const [chargeList, setChargeList] = useState(null);

  db.doc('/chargesLists/qHEp1EsQ7TXQCKppkKC4')
    .get()
    .then(doc => {
      if (doc.exists) {
        setChargeList(doc.data());
      }
    });

  return (
    <div>
      <div>{JSON.stringify(chargeList)}</div>

      <h1>ChargeList2 {chargeList && chargeList.name}</h1>
    </div>
  );
};

export default ChargeList2;

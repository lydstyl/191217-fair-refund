import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase/base';

export const ChargeListContext = React.createContext();

export const ChargeListProvider = ({ children }) => {
  const [chargeList, setChargeList] = useState(null);

  useEffect(() => {
    db.collection('users')
      .get()
      .then(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, email: doc.data().email });
        });
        setChargeList(list);
      });
  }, []);

  return (
    <ChargeListContext.Provider value={{ chargeList }}>
      {children}
    </ChargeListContext.Provider>
  );
};

import React from 'react';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';

import { db } from '../../utils/firebase/base';

const ChargesList = () => {
  const { chargeStore, chargeDispatch } = useChargeCtx();
  const { chargesList } = chargeStore;
  const charges = chargesList.chargesList;

  console.log(chargesList, charges);

  const handleDelete = event => {
    const chargeId = event.target.parentNode.id;

    // delete with db then in chargeStore

    db.collection(`/chargesLists/${chargesList.id}/charges`)
      .doc(chargeId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');

        // setCharges(charges.filter(charge => charge.id !== chargeId));

        // const chargeToBeDeleted = charges.filter(
        //   charge => charge.id === chargeId
        // );

        // const {
        //   data: { chargeTotal, chargePercent }
        // } = chargeToBeDeleted[0];

        // addToTotals(
        //   -numOr0(chargeTotal),
        //   -numOr0(chargePercent) * numOr0(chargeTotal)
        // );
        // loadingDispatch({
        //   type: SET_LOADING,
        //   payload: false
        // });
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <div>
      <ul>
        {charges &&
          charges.map(charge => (
            <li key={charge.chargeId} id={charge.chargeId}>
              <pre>{JSON.stringify(charge, null, 4)}</pre>

              <button onClick={handleDelete}>Supprimer</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChargesList;

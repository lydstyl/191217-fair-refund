import React from 'react';

import { Link } from 'react-router-dom';

const MediumImage = props => {
  const {
    location: { charge }
  } = props;
  const {
    //id,
    data: {
      chargeListId,
      chargeDate,
      chargeImages,
      chargeName,
      chargePercent,
      chargeRefund,
      chargeTotal
    }
  } = charge;

  return (
    <>
      <h1>Détail de la dépense {chargeName}</h1>
      <div>
        <Link to={`/charge-list/${chargeListId}`}> {'<-- précédent'} </Link>
      </div>

      {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}

      {/* <pre>{JSON.stringify(charge, null, 4)}</pre> */}

      <div>
        Dépense{chargeDate && <span> du {chargeDate}</span>} {chargeTotal}
      </div>
      <div>Pourcentage de remboursement demandé {chargePercent}</div>
      <div>
        Remboursement demandé = {chargeTotal} x {chargePercent} = {chargeRefund}
      </div>

      {chargeImages.medium && (
        <div>
          <img src={chargeImages.medium} alt='Medium size proof of charge' />
        </div>
      )}

      {chargeImages.original && (
        <a
          href={chargeImages.original}
          target='_blank'
          rel='noopener noreferrer'
        >
          Voir le fichier original
        </a>
      )}
    </>
  );
};

export default MediumImage;

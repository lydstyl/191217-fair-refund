import React from 'react';

import { Link } from 'react-router-dom';

const MediumImage = ({ location: { charge } }) => {
  const { chargeId, date, images, name, percent, refund, total } = charge;

  return (
    <>
      <h1>Détail de la dépense {name}</h1>
      <div>
        <Link to={`/charge-list/${chargeId}`}> {'<-- précédent'} </Link>
      </div>

      <div>
        Dépense{date && <span> du {date}</span>} {total}
      </div>
      <div>Pourcentage de remboursement demandé {percent}</div>
      <div>
        Remboursement demandé = {total} x {percent} / 100 = {refund}
      </div>

      {images.medium && (
        <div>
          <img src={images.medium} alt='Medium size proof of charge' />
        </div>
      )}

      {images.original && (
        <a href={images.original} target='_blank' rel='noopener noreferrer'>
          Voir le fichier original
        </a>
      )}
    </>
  );
};

export default MediumImage;

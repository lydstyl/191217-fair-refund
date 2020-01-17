import React from 'react';
import { Link } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';

import StyledMediumImage from './StyledMediumImage';

const MediumImage = ({ location: { charge } }) => {
  const { chargeId, date, images, name, percent, refund, total } = charge;
  const { chargeStore, chargeDispatch } = useChargeCtx();

  return (
    <StyledMediumImage>
      <h1>
        <span>Détail de la dépense </span>

        <span className='strong'>{name}</span>
      </h1>
      <div className='back'>
        <Link to={`/charge-list/${chargeStore.chargesList.id}`}>
          <FaBackward />

          <span> précédent ${chargeId}</span>
        </Link>
      </div>

      {date && total && (
        <div>
          <span>Dépense du </span>

          <span className='strong'>{date}</span>

          <span> de </span>

          <span className='strong'>{total}</span>
        </div>
      )}

      {percent && (
        <div>
          Pourcentage de remboursement demandé{' '}
          <span className='strong'>{percent}</span>
        </div>
      )}

      {total && (
        <div>
          Remboursement demandé =
          <span className='strong'>
            {total} x {percent} / 100 = {refund}
          </span>
        </div>
      )}

      {images.medium && (
        <div>
          <img src={images.medium} alt='Medium size proof of charge' />
        </div>
      )}

      {images.original && (
        <a href={images.original} target='_blank' rel='noopener noreferrer'>
          <span>Voir le fichier original</span>
        </a>
      )}
    </StyledMediumImage>
  );
};

export default MediumImage;

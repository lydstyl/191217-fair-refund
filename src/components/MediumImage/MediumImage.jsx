import React, { useState, useEffect } from 'react';
import { FaBackward } from 'react-icons/fa';

import { db } from '../../utils/firebase/base';

import Spinner from '../../images/spinner.gif';

import StyledMediumImage from './StyledMediumImage';

const MediumImage = ({ location: { charge } }) => {
  const tmp = window.location.href.split('/');
  const [detailCharge, setDetailCharge] = useState({
    chargesListId: tmp[4],
    chargeId: tmp[5],
    date: null,
    images: null,
    name: null,
    percent: null,
    refund: null,
    total: null
  });

  const [loading, setLoading] = useState(true);

  const {
    chargesListId,
    chargeId,
    date,
    images,
    name,
    percent,
    refund,
    total
  } = detailCharge;

  useEffect(() => {
    if (charge) {
      setDetailCharge({ ...detailCharge, ...charge });
      setLoading(false);
    } else {
      db.collection(`/chargesLists/${chargesListId}/charges`)
        .doc(chargeId)
        .get()
        .then(res => {
          setDetailCharge({ ...detailCharge, ...res.data() });
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [charge, chargesListId]);

  return loading ? (
    <img src={Spinner} alt='spinner' />
  ) : (
    <StyledMediumImage>
      {chargeId && (
        <>
          <h1>
            <span>Détail de la dépense </span>

            <span className='strong'>{name}</span>
          </h1>
          <div className='back'>
            <a href={`/charge-list/${chargesListId}`}>
              <FaBackward />

              <span> précédent</span>
            </a>
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
                {total} x {percent}
                <span className='normal'> /100 = </span>
                {refund}
              </span>
            </div>
          )}

          {images && images.medium && (
            <div>
              <img src={images.medium} alt='Medium size proof of charge' />
            </div>
          )}

          {images && images.original && (
            <a href={images.original} target='_blank' rel='noopener noreferrer'>
              <span>Voir le fichier original</span>
            </a>
          )}
        </>
      )}
    </StyledMediumImage>
  );
};

export default MediumImage;

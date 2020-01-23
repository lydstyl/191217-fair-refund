import React, { useState, useEffect } from 'react';
import { FaBackward } from 'react-icons/fa';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';
import txt from './translations';

import { db } from '../../utils/firebase/base';

import Spinner from '../Spinner/Spinner';

import StyledMediumImage from './StyledMediumImage';

const MediumImage = ({ location: { charge } }) => {
  const {
    settingsStore: { lang }
  } = useSettingsCtx();
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
    <Spinner />
  ) : (
    <StyledMediumImage>
      {chargeId && (
        <>
          <h1>
            <span>{txt.chargeDetail[lang]} </span>

            <span className='strong'>{name}</span>
          </h1>
          <div className='back'>
            <a href={`/charge-list/${chargesListId}`}>
              <FaBackward />

              <span> {txt.back[lang]} </span>
            </a>
          </div>

          {date && total && (
            <div>
              <span>{txt.chargeFrom[lang]} </span>

              <span className='strong'>{date}</span>

              <span> {txt.of[lang]} </span>

              <span className='strong'>{total}</span>
            </div>
          )}

          {percent && (
            <div>
              {txt.refundPercentAsked[lang]}{' '}
              <span className='strong'>{percent}</span>
            </div>
          )}

          {total && (
            <div>
              {txt.askedRefund[lang]} =
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
              <span>{txt.seeOriginal[lang]}</span>
            </a>
          )}
        </>
      )}
    </StyledMediumImage>
  );
};

export default MediumImage;

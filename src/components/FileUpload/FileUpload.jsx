import React, { useState } from 'react';

import Spinner from '../../images/spinner.gif';

import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

const FileUpload = () => {
  const [cloudinaryFiles, setCloudinaryFiles] = useState({
    thumb: '',
    medium: '',
    original: ''
  });
  const [loading, setLoading] = useState(false);

  const { chargeDispatch } = useChargeCtx();

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'darwin');

    setLoading(true);

    try {
      const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: 'POST',
        body: data
      });

      const file = await res.json();

      const images = {
        thumb: file.eager[1].secure_url,
        medium: file.eager[0].secure_url,
        original: file.secure_url
      };

      chargeDispatch({
        type: chargeActions.SET_IMAGES_TO_CURRENT_CHARGE.type,
        payload: images
      });

      setCloudinaryFiles(images);

      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='field'>
      <label>Preuve / image</label>
      <input
        type='file'
        name='file'
        placeholder='Upload an image'
        onChange={uploadImage}
      />

      {loading ? (
        <img src={Spinner} alt='spinner' />
      ) : cloudinaryFiles.thumb !== '' ? (
        <img
          src={cloudinaryFiles.thumb}
          alt='Charge proof'
          style={{ width: '300px' }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default FileUpload;

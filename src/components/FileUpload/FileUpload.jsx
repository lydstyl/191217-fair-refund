import React, { useState } from 'react';

const FileUpload = ({ cloudinaryFile, setCloudinaryFile }) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

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

      const thumb = file.eager[1].secure_url;
      setCloudinaryFile({
        thumb,
        medium: file.eager[0].secure_url,
        original: file.secure_url
      });

      setImage(thumb);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='field'>
      <input
        type='file'
        name='file'
        placeholder='Upload an image'
        onChange={uploadImage}
      />

      {loading ? (
        <p>Loading...</p>
      ) : cloudinaryFile && image !== '' ? (
        <img src={image} alt='Charge proof' style={{ width: '300px' }} />
      ) : (
        ''
      )}
    </div>
  );
};

export default FileUpload;

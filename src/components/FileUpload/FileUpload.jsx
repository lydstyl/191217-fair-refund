import React, { useState } from 'react';

const FileUpload = () => {
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

      setImage(file.secure_url);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='App'>
      <h1>Upload Image</h1>
      <input
        type='file'
        name='file'
        placeholder='Upload an image'
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} alt='charge' style={{ width: '300px' }} />
      )}
    </div>
  );
};

export default FileUpload;

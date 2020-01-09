import React, { useState } from 'react';

const FileUpload2 = () => {
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

      // console.log(file);
      // console.log(file.secure_url);
      // console.log(file.eager[0].secure_url);

      setImage(file.secure_url);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <input
        type='file'
        name='file'
        placeholder='Upload an image'
        onChange={uploadImage}
      />

      {/* <div>
        xxx {image !== ''} {image}
      </div> */}
      {loading ? (
        <p>Loading...</p>
      ) : image !== '' ? (
        <img src={image} alt='Charge proof' style={{ width: '300px' }} />
      ) : (
        ''
      )}
    </>
  );
};

export default FileUpload2;

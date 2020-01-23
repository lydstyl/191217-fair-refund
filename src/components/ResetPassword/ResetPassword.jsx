import React from 'react';

import app from '../../utils/firebase/base';

import StyledResetPassword from './StyledResetPassword';

const ResetPassword = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const email = document.querySelector('[type="email"]').value;

    app
      .auth()
      .sendPasswordResetEmail(
        email
        // {        url: 'https://fair-refund.netlify.com/login' }
      )
      .then(() => {
        alert('E-mail sent');
      })
      .catch(error => {
        alert('Error visible in your browser console');
        console.log(error);
      });
  };

  return (
    <StyledResetPassword>
      <h1>Forgot password</h1>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>Your e-mail</label>
          <input type='email' />
        </div>
        <div className='field'>
          <input type='submit' value='Reset my password' />
        </div>
      </form>
    </StyledResetPassword>
  );
};

export default ResetPassword;

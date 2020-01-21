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
      .then(res => {
        console.log(res);
        alert('E-mail de réinitialisation de mot de passe envoyé');
      })
      .catch(error => {
        alert('Erreur visible dans la console de votre navigateur');
        console.log(error);
      });
  };

  return (
    <StyledResetPassword>
      <h1>Mot de passe oublié</h1>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>Votre e-mail</label>
          <input type='email' />
        </div>
        <div className='field'>
          <input type='submit' value='Réinitialiser mon mot de passe' />
        </div>
      </form>
    </StyledResetPassword>
  );
};

export default ResetPassword;

import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { FaUserPlus } from 'react-icons/fa';

import app from '../../utils/firebase/base';

import StyledLogin from '../Login/styledLogin';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();

      const { email, password } = event.target.elements;

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <StyledLogin>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <div className='field'>
          <label>E-mail</label>
          <input name='email' type='email' placeholder='Email' />
        </div>

        <div className='field'>
          <label>Mot de passe</label>
          <input
            autoComplete='true'
            name='password'
            type='password'
            placeholder='Password'
          />
        </div>

        <button type='submit'>
          <FaUserPlus />
        </button>
      </form>
    </StyledLogin>
  );
};

export default withRouter(SignUp);

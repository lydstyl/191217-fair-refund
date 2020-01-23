import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect, Link } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';

import { useUser } from '../../reducers/useUser';

import app from '../../utils/firebase/base';

import StyledLogin from './styledLogin';

export const Login = ({ history }) => {
  const { userStore } = useUser();
  const currentUser = userStore.currentUser;

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();

      const { email, password } = event.target.elements;

      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);

        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (!!currentUser) {
    return <Route render={() => <Redirect to={'/'} />} />;
  }

  return (
    <StyledLogin>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className='field'>
          <label>E-mail</label>
          <input name='email' type='email' placeholder='E-mail' />
        </div>

        <div className='field'>
          <label>Password</label>
          <input
            autoComplete='true'
            name='password'
            type='password'
            placeholder='Password'
          />
        </div>

        <button type='submit'>
          <IoIosLogIn />
        </button>
      </form>

      <Link to='/reset-password'>Forgot password ?</Link>
    </StyledLogin>
  );
};

export default withRouter(Login);

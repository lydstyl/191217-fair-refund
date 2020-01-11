import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

import { useUser } from '../../reducers/useUser';

import app from '../../utils/firebase/base';

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
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name='email' type='email' placeholder='Email' />
        </label>
        <label>
          Password
          <input
            autoComplete='true'
            name='password'
            type='password'
            placeholder='Password'
          />
        </label>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);

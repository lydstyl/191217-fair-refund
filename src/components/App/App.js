import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Quotes from '../Quotes/Quotes';
import ChargeListBox from '../ChargeListBox/ChargeListBox';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Menu from '../Menu/Menu';

import ChargesLists from '../ChargesLists/ChargesLists';

import { AuthProvider } from '../Auth/Auth';

import { UserCtxProvider } from '../../Reducers/useUser';
import { SettingsCtxProvider } from '../../Reducers/useSettings';

import Counter from '../Counter';

import { ChargeCtxProvider } from '../../Reducers/useCharge';

import './App.scss';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Menu />

        <ChargeCtxProvider>
          <UserCtxProvider>
            <SettingsCtxProvider>
              <div className='container'>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/quotes' component={Quotes} />
                <PrivateRoute exact path='/test' component={ChargeListBox} />
                <PrivateRoute exact path='/test2' component={Counter} />
                <PrivateRoute
                  exact
                  path='/charges-lists'
                  component={ChargesLists}
                />
              </div>
            </SettingsCtxProvider>
          </UserCtxProvider>
        </ChargeCtxProvider>

        <footer>
          <div>
            Un commentaire ? Vous pouvez l'envoyer sur lydstyl@gmail.com
          </div>
        </footer>
      </Router>
    </AuthProvider>
  );
};

export default App;

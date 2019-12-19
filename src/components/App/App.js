import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Home from '../Home/Home';
import Quotes from '../Quotes/Quotes';
import ChargesLists from '../ChargesLists/ChargesLists';

import { AuthProvider } from '../Auth/Auth'; // maybe to change
import { UserCtxProvider } from '../../reducers/useUser'; // with this one ?
import { ChargeCtxProvider } from '../../reducers/useCharge';

import './App.scss';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Menu />

        <UserCtxProvider>
          <ChargeCtxProvider>
            <div className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/quotes' component={Quotes} />
              <PrivateRoute
                exact
                path='/charges-lists'
                component={ChargesLists}
              />
            </div>
          </ChargeCtxProvider>
        </UserCtxProvider>

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

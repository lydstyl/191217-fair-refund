import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { UserCtxProvider } from '../../reducers/useUser';
import { ChargeCtxProvider } from '../../reducers/useCharge';
import { LoadingCtxProvider } from '../../reducers/useLoading';

import { ChargeCtx2Provider } from '../../context/useCharge2/useChargeCtx';

import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ChargesLists2 from '../ChargesLists/ChargesLists2';
import EditChargesList from '../EditChargesList/EditChargesList';
import ChargesListBox from '../ChargesListBox/ChargesListBox';
import MediumImage from '../MediumImage/MediumImage';

import './App.scss';

export const App = () => {
  return (
    <Router>
      <UserCtxProvider>
        <Menu />

        <div className='container'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <LoadingCtxProvider>
            <ChargeCtx2Provider>
              <ChargeCtxProvider>
                <PrivateRoute exact path='/' component={ChargesLists2} />
                <PrivateRoute
                  path='/edit-charge-list'
                  component={EditChargesList}
                />
                <Route path='/charge-list' component={ChargesListBox} />
                <Route path='/charge' component={MediumImage} />
              </ChargeCtxProvider>
            </ChargeCtx2Provider>
          </LoadingCtxProvider>
        </div>
      </UserCtxProvider>

      <footer>
        <div>
          Un commentaire ? Vous pouvez l'envoyer sur la vidéo de cette
          application ou en privé sur lydstyl@gmail.com
        </div>
      </footer>
    </Router>
  );
};

export default App;

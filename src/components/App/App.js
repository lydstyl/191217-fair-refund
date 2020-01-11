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
// import ChargesLists from '../ChargesLists/ChargesLists';
import ChargesLists2 from '../ChargesLists/ChargesLists2';
import ChargeList from '../ChargeList/ChargeList';
import MediumImage from '../MediumImage/MediumImage';

import Test from '../Test/Test';

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
                <Route exact path='/test' component={Test} />
                <PrivateRoute exact path='/' component={ChargesLists2} />
                <Route path='/charge-list' component={ChargeList} />
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

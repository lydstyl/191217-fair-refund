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
import Footer from '../Footer/Footer';
import ResetPassword from '../ResetPassword/ResetPassword';

import DefaultCss from './DefaultCss';
import StyledContainer from './StyledContainer';

export const App = () => {
  return (
    <DefaultCss>
      <Router>
        <UserCtxProvider>
          <ChargeCtx2Provider>
            <Menu />

            <StyledContainer className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />

              <LoadingCtxProvider>
                <ChargeCtxProvider>
                  <PrivateRoute exact path='/' component={ChargesLists2} />
                  <PrivateRoute
                    path='/edit-charge-list'
                    component={EditChargesList}
                  />
                  <Route path='/charge-list' component={ChargesListBox} />
                  <Route path='/charge' component={MediumImage} />
                </ChargeCtxProvider>
              </LoadingCtxProvider>

              <Route path='/reset-password' component={ResetPassword} />
            </StyledContainer>
          </ChargeCtx2Provider>
        </UserCtxProvider>
      </Router>

      <Footer />
    </DefaultCss>
  );
};

export default App;

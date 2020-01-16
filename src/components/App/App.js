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

import styled from 'styled-components';

import { size, spaces, fontSizes, colors } from '../../utils/style/variables';

const StyledContainer = styled.div`
  max-width: ${size.laptop};
  margin: auto;
  padding: 0 ${spaces.medium};

  font-size: ${fontSizes.medium};
  color: ${colors.darkgrey};

  h1 {
    margin: ${spaces.large} 0;
    color: ${colors.violet};
  }

  svg {
    font-size: ${fontSizes.large};
  }

  /* sticky-footer */
  min-height: calc(100vh - 270px);
`;

export const App = () => {
  return (
    <Router>
      <UserCtxProvider>
        <Menu />

        <StyledContainer>
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
        </StyledContainer>
      </UserCtxProvider>

      <Footer />
    </Router>
  );
};

export default App;

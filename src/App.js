import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Quotes from './Quotes';
import PrivateRoute from './PrivateRoute';
import User from './User';
import { AuthProvider } from './Auth';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <User />
        <br />
        <br />
        <Link to='/'>Home</Link>
        <br />
        <br />
        <Link to='/login'>login</Link>
        <br />
        <br />
        <Link to='/signup'>signup</Link>
        <br />
        <br />
        <Link to='/quotes'>quotes</Link>
        <div>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/quotes' component={Quotes} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

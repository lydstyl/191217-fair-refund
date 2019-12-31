import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useUser } from '../../reducers/useUser';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { userStore } = useUser();
  const currentUser = userStore.currentUser;

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;

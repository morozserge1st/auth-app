import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../lib/auth/useAuth';

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) =>{
  const { isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;

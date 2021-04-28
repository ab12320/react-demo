// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
import {
  Route,
  Redirect
} from "react-router-dom";
import React from "react";

export default function PrivateRoute({ children, ...rest }) {

  const isAuthenticated = rest.accessToken;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

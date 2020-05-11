import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

const ProtectedRoute = ({ component: Component, authContext, ...rest }) => {
  if (authContext.isLoading) {
    return null;
  } else if (authContext.isLoggedIn) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/signin" />;
  }
};

export default withUser(ProtectedRoute);

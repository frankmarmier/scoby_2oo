import React from "react";
import { withUser } from "../components/Auth/withUser";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";



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

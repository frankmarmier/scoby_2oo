import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormItem from "./components/Forms/FormItem";
import FormItemUpdate from "./components/Forms/FormItemUpdate";

function App() {
  return (
    <React.Fragment>
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/items/create" component={FormItem} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute path="/items/:id" component={FormItemUpdate} />
      </Switch>
    </React.Fragment>
  );
}

export default App;

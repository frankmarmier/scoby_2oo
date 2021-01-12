import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormItem from "./components/Forms/FormItem";
import FormItemEdit from "./components/Forms/FormItemEdit";
import ItemCard from "./components/ItemCard";
import FormUserEdit from "./components/Forms/FormUserEdit";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/item/create" component={FormItem} />
        <Route exact path="/item/edit/:id" component={FormItemEdit} />
        <Route exact path="/itemcard" component={ItemCard} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute
          exact
          path="/profile/settings"
          component={FormUserEdit}
        />
      </Switch>
    </div>
  );
}

export default App;

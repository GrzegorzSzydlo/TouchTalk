import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "../components/Signin.jsx";
import Signup from "../components/Signup.jsx";
import Logout from "../components/Logout.jsx";

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/logout' component={Logout} />
    </Switch>
  );
};

export default Routes;

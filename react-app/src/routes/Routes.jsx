import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "../components/Signin.jsx";
import Signup from "../components/Signup.jsx";
import Home from "../components/Home.jsx";


const Routes = () => {
  return (
    <Switch>
       <Route path='/' exact component={Signin} />
       <Route path='/signup' component={Signup} />
        <Route path="/notifications" component={Home}/>
        <Route path="/messages" component={Home}/>
        <Route path="/tasks" component={Home}/>
        <Route path="/calls" component={Home}/>
        <Route path="/teams" component={Home}/>
        <Route path='/home' component={Home} />
        <Route path='/account' component={Home} />

    </Switch>
  );
};

export default Routes;

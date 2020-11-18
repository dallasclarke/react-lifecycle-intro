import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Home from "./components/home/home";
import Nav from "./components/nav/Nav";
import Todo from "./components/Todo/Todo"

class App extends Component {
  
  state = {
    isAuth: false,
    user: null,
  };

  auth = () => {

  };
  
  render() {
    return (
      <Router>
        <Nav /> 
        <Switch>
          <Route exact path="/sign-up" component={Signup} />
          <Route exact path="/sign-in" component={Signin} />
          <Route exact path="/todo" component={Todo} /> 
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;

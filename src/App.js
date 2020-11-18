import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Home from "./components/home/home";
import Nav from "./components/nav/Nav";
import Todo from "./components/Todo/Todo";
import jwtDecode from "jwt-decode";

class App extends Component {
  state = {
    isAuth: false,
    user: null,
  };

  auth = (jwtToken) => {
    let decoded = jwtDecode(jwtToken);

    this.setState({
      isAuth: true,
      user: {
        email: decoded.email,
        _id: decoded._id,
      },
    });
   };

   logout = () => {
     this.setState({
       isAuth: false,
       user: null,
     });
   };

  render() {
    return (
      <Router>
        <Nav isAuth={this.state.isAuth} user={this.state.user} />
        <Switch>
          <Route exact path="/sign-up" component={Signup} />
          <Route
            exact
            path="/sign-in"
            component={(props) => <Signin {...props} auth={this.auth} />}
          />
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;

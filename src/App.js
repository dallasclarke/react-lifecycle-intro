import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Todo from "./components/Todo/Todo";
import Home from "./components/home/home";
import Nav from "./components/nav/Nav";
import PrivateRoute from "./components/shared/PrivateRoute";

import "./App.css";

class App extends Component {
  state = {
    isAuth: false,
    user: null,
  };

  componentDidMount() {
    let token = localStorage.getItem("jwtToken");

    if (token !== null) {
      let decoded = jwtDecode(token);

      let currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        //this.rpops.history.push("/");
      } else {
        this.setState({
          isAuth: true,
          user: {
            email: decoded.email,
            _id: decoded._id,
          },
        });
        //this.props.history.push("/todo");
      }
    }
  }

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
    localStorage.removeItem("jwtToken");
    this.setState({
      isAuth: false,
      user: null,
    });
  };

  render() {
    return (
      <Router>
        <Nav
          isAuth={this.state.isAuth}
          user={this.state.user}
          logout={this.logout}
        />
        <Switch>
          <Route exact path="/sign-up" component={Signup} />
          {/* <Route exact path="/sign-in" component={Signin} auth={this.auth} /> */}
          <Route
            exact
            path="/sign-in"
            component={(props) => <Signin {...props} auth={this.auth} />}
          />
          {/* <Route exact path="/todo" component={Todo} /> */}
          <PrivateRoute
            exact
            path="/todo"
            isAuth={this.state.isAuth}
            user={this.state.user}
            component={Todo}
          />

          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
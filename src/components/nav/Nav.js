import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default class Nav extends Component {
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
      } else {
        this.setState({
          isAuth: true,
          user: {
            email: decoded.email,
            _id: decoded._id,
          },
        });
      }

      this.setState({
        isAuth: true,
        user: {
          email: decoded.email,
          _id: decoded._id,
        },
      });
    }
  }

  logout = () => {
    localStorage.removeItem("jwtToken");

    this.setState({
      isAuth: false,
      user: null,
    });
  };

  render() {
    let nav;

    if (this.state.isAuth && this.state.user !== null) {
      nav = (
        <div>
          <ul style={{ listStyle: "none" }}>
            <li style={{ display: "inline", marginRight: 20 }}>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                {this.state.user.email}
              </Link>
            </li>
            <li style={{ display: "inline" }}>
              <Link to="/logout" style={{ textDecoration: "none" }}>
                logout
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      nav = (
        <div>
          <ul style={{ listStyle: "none" }}>
            <li style={{ display: "inline", marginRight: 20 }}>
              <Link to="/sign-in" style={{ textDecoration: "none" }}>
                Sign In
              </Link>
            </li>
            <li style={{ display: "inline" }}>
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                Register
              </Link>
            </li>
          </ul>
        </div>
      );
    }

    return <>{nav}</>;
  }
}

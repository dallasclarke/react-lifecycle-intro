import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class home extends Component {
  render() {
    return (
      <div>
        THE GREATEST TO DO APP ON THE PLANET!! Sign up to use this app
        <Link to="/sign-up"> here</Link>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class home extends Component {
  render() {
    return (
      <div>
        The greatest todo app on the planet! Sign up to use this app
        <Link to="/sign-up">Here</Link>
      </div>
    );
  }
}

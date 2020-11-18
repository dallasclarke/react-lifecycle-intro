import React, { Component } from "react";
import validator from "validator";
import axios from "axios";
import jwtDecode from "jwt-decode";

import Todo from "../Todo/Todo";
import Message from "../shared/Message";
// import "./Signin.css";

class Signin extends Component {
  state = {
    user: null,
    email: "",
    password: "",
    errorMessage: "",
    isError: false,
    submitErrorMessage: "",
    isSubmitError: false,
    isSuccessMessage: false,
    successMessage: "",
  };

  componentDidMount() {
    let token = localStorage.getItem("jwtToken");

    if (token !== null) {
      let decoded = jwtDecode(token);

      let currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        this.props.history.push("/sign-in");
      } else {
        this.props.history.push("/todo");
      }
    }
  };

  handleOnChangeEmail = (event) => {
    //1. how to check if the input is an email???
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const { email } = this.state;
        // let isEmail = email.includes("@");
        // if (isEmail) {
        //   console.log("Correct");
        // } else {
        //   console.log("False");
        // }
        let isEmail = validator.isEmail(email);
        if (isEmail) {
          this.setState({
            isError: false,
            errorMessage: "",
          });
        } else {
          //show error message
          this.setState({
            isError: true,
            errorMessage: "Please, enter a correct email",
          });
        }
      }
    );
  };

  handleOnChangePassword = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // Please include 1 uppercase 1 lowercase 1 number 1 symbol and must be 8 characters long
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (validator.isEmpty(email) && validator.isEmpty(password)) {
      this.setState({
        isSubmitError: true,
        submitErrorMessage: "Cannot have empty email && Password",
      });
      return;
    } else {
      this.setState({
        isSubmitError: false,
        submitErrorMessage: "",
      });
    }
    if (validator.isEmpty(email)) {
      this.setState({
        isSubmitError: true,
        submitErrorMessage: "Cannot have empty email",
      });
      return;
    } else {
      this.setState({
        isSubmitError: false,
        submitErrorMessage: "",
      });
    }
    if (validator.isEmpty(password)) {
      this.setState({
        isSubmitError: true,
        submitErrorMessage: "Cannot have empty password",
      });
      return;
    } else {
      this.setState({
        isSubmitError: false,
        submitErrorMessage: "",
      });
    }

    try {
      let success = await axios.post(
        "http://localhost:3003/api/users/sign-in",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("jwtToken", success.data.jwtToken);

      this.setState(
        {
          isError: false,
          errorMessage: "",
          isAuth: true,
        },
        () => {
          this.props.history.push("/todo");
        }
      );
    } catch (e) {
      //console.log(e.response);
      // console.log(e.response.status);
      // console.log(e.response.data.message);
      let errorMessage = e.toString();
      if (errorMessage === "Error: Network Error") {
        this.setState({
          isError: true,
          errorMessage:
            "Sorry There's something wrong with the network, please email us",
        });
        return;
      }
      if (e && e.response.status === 401) {
        this.setState({
          isError: true,
          errorMessage: e.response.data.message,
        });
      } else if (e && e.response.status === 404) {
        this.setState({
          isError: true,
          errorMessage: e.response.data.message,
        });
      }
    }
  };

  auth = () => {}

  render() {
    const {
      isAuth,
      errorMessage,
      isError,
      isSubmitError,
      submitErrorMessage,
      isSuccessMessage,
      successMessage,
    } = this.state;

    let showTodoComponent = isAuth ? (
      <Todo />
    ) : (
      <form onSubmit={this.handleOnSubmit}>
        {" "}
        {/* {isError ? <div className="error-message">{errorMessage}</div> : ""} */}
        {isError ? (
          <Message className={"error-message"} message={errorMessage} />
        ) : (
          ""
        )}
        {isSubmitError ? (
          <div className="error-message">{submitErrorMessage}</div>
        ) : (
          ""
        )}
        {/* {isSuccessMessage ? (
          <div className="success-message">{successMessage}</div>
        ) : (
          ""
        )} */}
        {isSuccessMessage ? (
          <Message className={"success-message"} message={successMessage} />
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="enter email"
          name="email"
          onChange={this.handleOnChangeEmail}
          value={this.state.email}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="enter password"
          name="password"
          onChange={this.handleOnChangePassword}
          value={this.state.password}
        />{" "}
        <br /> <button>Sign in</button>
      </form>
    );
    return (
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        {showTodoComponent}
      </div>
    );
  }
}
export default Signin;

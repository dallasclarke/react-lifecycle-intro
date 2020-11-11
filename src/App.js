import React, { Component } from "react";
import validator from "validator";

import Todo from "./components/Todo/Todo";

class App extends Component {
  state = {
    isAuth: false,
    email: "",
    password: "",
    errorMessage: "",
    isError: false,
    isPasswordError: false,
    isPasswordErrorMessage: "",
    submitErrorMessage: "",
    isSubmitError: false,
  };

  handleOnChange = (event) => {
    
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      const {email} = this.state;
      // let isEmail = email.includes('@');

      // if (isEmail) {
      //   console.log('Correct')
      // } else {
      //   console.log('Wrong!')
      // }
      let isEmail = validator.isEmail(email);

      if (isEmail) {
        this.setState({
          isError: false,
          errorMessage: "",
        })
      } else {
        this.setState({
          isError: true,
          errorMessage: "Please enter a correct email!"
        });
      }

    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      const {password} = this.state;

      let isPassword = validator.matches(
        password,
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      );

      if (isPassword) {
        this.setState({
          isPasswordError: false,
          isPasswordErrorMessage: "",
        });
      } else {
        this.setState({
          isPasswordError: true,
          isPasswordErrorMessage: "Password must contain 1 Uppercase, 1 lowercase, 1 special character & symbol"
        });
      }

    });

  };


  handleOnSubmit = (event) => {
    event.preventDefault();

    const {email, password} = this.state;
    
    if (validator.isEmpty(email) && validator.isEmpty(password)) {
      this.setState({
        isSubmitError: true,
        submitErrorMessage: "Cannot have empty email & password",
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
    } else {
      this.setState({
        isSubmitError: false,
        submitErrorMessage: "",
      });
    }
    

    // console.log(this.state);
  };

  render() {
    const { isAuth, errorMessage, isError, isPasswordError, isPasswordErrorMessage, isSubmitError, submitErrorMessage } = this.state;

    let showTodoComponent = isAuth ? (
      <Todo />
    ) : (
      <form onSubmit={this.handleOnSubmit}>
        {" "}
        {isError ? <div>{errorMessage}</div> : ""}
        {isSubmitError ? <div>{submitErrorMessage}</div> : ""}
        <input
          type="text"
          placeholder="enter email"
          name="email"
          onChange={this.handleOnChange}
          value={this.state.email}
        />{" "}
        <br />{isPasswordError ? <div>{isPasswordErrorMessage}</div> : ""}
        <input
          type="text"
          placeholder="enter password"
          name="password"
          onChange={this.handleOnChangePassword}
          value={this.state.password}
        />{" "}
        <br /> <button>Sign up</button>
      </form>
    );

    return (
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        {showTodoComponent}
      </div>
    );
  }
}

export default App;

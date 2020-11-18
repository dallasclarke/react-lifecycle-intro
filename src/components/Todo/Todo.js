import React, { Component } from "react";
import jwtDecode from "jwt-decode";

import { v4 as uuidv4 } from "uuid";
import TodoView from "./TodoView";

export default class Todo extends Component {
  state = {
    todoList: [],
    todoValue: "",
    showErrorMessage: false,
    showNoTodosMessage: false,
    showEditInput: false,
    editTodoValue: "",
    disabledEditButton: false,
  };

  // componentDidMount() {
  //   let token = localStorage.getItem("jwtToken");

  //   if (token !== null) {
  //     let decoded = jwtDecode(token);

  //     let currentTime = Date.now() / 1000;

  //     if (decoded.exp < currentTime) {
  //       localStorage.removeItem("jwtToken");
  //       this.props.history.push("/sign-in");
  //     } else {
  //       this.props.history.push("/sign-in");
  //     }
  //   }
  // }

  handleInputChange = (event) => {
    //console.log(event.target.name, event.target.value);

    if (this.state.showErrorMessage) {
      this.setState({
        showErrorMessage: false,
      });
    }

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.todoValue.length === 0) {
      this.setState({
        showErrorMessage: true,
      });
      return;
    }

    let newTodoObj = {
      id: uuidv4(),
      todo: this.state.todoValue,
    };

    let newArray = [...this.state.todoList, newTodoObj];
    // let newArray = [...this.state.todoList];
    // newArray.push(newTodoObj);

    this.setState(
      {
        todoList: newArray,
        todoValue: "",
      },
      () => {
        if (this.state.todoList.length > 0) {
          this.setState({
            showNoTodosMessage: false,
          });
        }
      }
    );
  };

  // showTodoList = () => {
  //   return this.state.todoList.map(({ id, todo }) => {
  //     return <li key={id}>{todo}</li>;
  //   });
  // };

  addFunc = () => {
    console.log("Add Func");
  };

  appHandleDeleteTodo = (targetID) => {
    //console.log("ID: ", id);

    let copiedArray = [...this.state.todoList];

    let filteredArray = copiedArray.filter(({ id }) => {
      return id !== targetID;
    });

    this.setState(
      {
        todoList: filteredArray,
      },
      () => {
        // console.log("-----" + "inside setState");
        if (this.state.todoList.length === 0) {
          this.setState({
            showNoTodosMessage: true,
          });
        }
      }
    );
    // console.log("outside setSTate");
    // if (this.state.todoList.length === 0) {
    //   this.setState({
    //     showNoTodosMessage: true,
    //   });
    // }
  };

  appHandleEditTodo = (targetID) => {
    console.log(targetID);
    console.log(this.state);
    let copiedArray = [...this.state.todoList];
    let editTodoValue;
    copiedArray.map((item) => {
      if (item.id === targetID) {
        item.editToggle = true;
        editTodoValue = item.todo;
      }
    });

    this.setState({
      todoList: copiedArray,
      showEditInput: true,
      editTodoValue: editTodoValue,
      disabledEditButton: true,
    });
  };

  appHandleEditTodoOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  appHandleEditSubmit = (targetID) => {
    let copiedArray = [...this.state.todoList];

    let updatedTodoArray = copiedArray.map((item) => {
      if (item.id === targetID) {
        item.todo = this.state.editTodoValue;
        item.editToggle = false;
      }
      return item;
    });

    this.setState({
      todoList: updatedTodoArray,
      showEditInput: false,
      disabledEditButton: false,
    });
  };

  render() {
    const {
      todoList,
      showErrorMessage,
      showNoTodosMessage,
      showEditInput,
      editTodoValue,
      disabledEditButton,
    } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {showErrorMessage ? (
          <div style={{ color: "red", marginTop: 10 }}>
            Please, enter something todo!
          </div>
        ) : null}
        <input
          onChange={this.handleInputChange}
          style={{ marginTop: 20 }}
          type="text"
          name="todoValue"
          value={this.state.todoValue}
        />{" "}
        <button onClick={this.handleSubmit}>Add</button>
        {/* <ul>{this.showTodoList()}</ul> */}
        {/* <ul style={{ listStyle: "none" }}>
          {this.state.todoList.map(({ id, todo }) => {
            return <li key={id}>{todo}</li>;
          })}
        </ul> */}
        {showNoTodosMessage ? (
          <div style={{ marginTop: 10, color: "blue" }}>
            Please add something to do!
          </div>
        ) : (
          <TodoView
            todoList={todoList}
            appHandleDeleteTodo={this.appHandleDeleteTodo}
            showEditInput={showEditInput}
            appHandleEditTodo={this.appHandleEditTodo}
            editTodoValue={editTodoValue}
            appHandleEditTodoOnChange={this.appHandleEditTodoOnChange}
            appHandleEditSubmit={this.appHandleEditSubmit}
            disabledEditButton={disabledEditButton}
            // nameString={"Hamster"}
            // age={123}
            // arrayObject={[1, 2, 3]}
            // trueOrFalse={false}
            // addFunc={this.addFunc}
            // obj={{ 1: 1, 2: 2, 3: 3 }}
          />
        )}
      </div>
    );
  }
}

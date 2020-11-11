import React, { Component } from "react";
import "./App.css";
class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     name: "",
  //     count: 0,
  //   };
  //   old way of doing scope binding in react
  //   this.MinusOne = this.MinusOne.bind(this);
  // }
  state = {
    name: "",
    count: 0,
  };
  //life cycle
  componentDidMount() {
    //console.log("11 Component Did Mount");
    this.setState({
      name: "Mr. Robot",
    });
  }
  AddOne() {
    //console.log("From AddOne Func");
    //document.getElementById.innerText = 1
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount,
    });
    //Don't do this ALWAYS USE SET STATE!!!
    //this.state.count = 1
    //prevState: it remembers the previous state
    // this.setState((prevState) => {
    //   console.log(prevState);
    //   return {
    //     count: prevState.count + 1,
    //   };
    // });
  }
  // MinusOne() {
  //   let newCount = this.state.count - 1;
  //   this.setState({
  //     count: newCount,
  //   });
  // }
  MinusOne = () => {
    let countDown = this.state.count - 1;
    this.setState({
      count: countDown,
    });
  };
  Reset = () => {
    this.setState({
      count: 0,
    });
  };
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: 5 }}>
        Good Afternoon {this.state.name}
        <div style={styles.buttonDivStyle}>
          <span>{this.state.count}</span>
          <button
            onClick={() =>
              this.setState({
                count: this.state.count + 1,
              })
            }
            className="plus-button-style"
          >
            +
          </button>{" "}
          {/* <button onClick={this.MinusOne.bind(this)}>-</button> old way of doing scope binding in react */}
          <button onClick={this.MinusOne}>-</button>
          <button onClick={this.Reset} className="plus-button-style">
            Reset
          </button>
        </div>
      </div>
    );
  }
}
const styles = {
  buttonDivStyle: {
    marginTop: 10,
  },
};
export default App;
//module.exports = App;
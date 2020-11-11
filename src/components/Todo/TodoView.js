import React from "react";
import { arrayOf, shape, number, string } from "prop-types";
import Span from "../shared/Span";

import "./TodoView.css";

const TodoView = ({
  todoList,
  appHandleDeleteTodo,
  appHandleEditTodo,
  appHandleOnChange,
  editValue,
  disableEditButton,
  appHandleUpdateSubmit,
}) => {
  //console.log(todoList);

  const todoViewHandleDeleteButton = (id) => {
    //console.log("ID: ", id);
    appHandleDeleteTodo(id);
  };

  // const todoViewHandleEditToButton = (id) => {
  //   appHandleEditTodo(id);
  // };

  return (
    <ul style={{ listStyle: "none" }}>
      {todoList.map(({ id, todo, editToggle }) => {
        return (
          <li key={id} style={{ margin: 20 }}>
            {
              //if editToggle is true show input otherwise show todo
              editToggle ? (
                <input
                  type="text"
                  value={editValue}
                  name="editValue"
                  onChange={(event) => appHandleOnChange(event)}
                  //onChange={appHandleOnChange()}
                />
              ) : (
                //<span> {todo}</span>
                <Span value={todo} />
              )
            }

            {editToggle ? (
              // <span
              //   className="todo-button-shared-style edit-button"
              //   onClick={() => appHandleUpdateSubmit(id)}
              // >
              //   Update
              // </span>

              <Span
                value="Update"
                id={id}
                onClick={appHandleUpdateSubmit}
                className="todo-button-shared-style edit-button"
              />
            ) : (
              // <span
              //   onClick={() => appHandleEditTodo(id)}
              //   className={`todo-button-shared-style edit-button ${
              //     disableEditButton ? "disabled" : ""
              //   }`}
              // >
              //   Edit
              // </span>
              <Span
                value="Edit"
                onClick={appHandleEditTodo}
                id={id}
                className={`todo-button-shared-style edit-button`}
                disableEditButton={disableEditButton}
                disabledClass="disabled"
              />
            )}
            {/* <span
              onClick={() => todoViewHandleDeleteButton(id)}
              className={`todo-button-shared-style delete-button ${
                disableEditButton ? "disabled" : ""
              }`}
            >
              Delete
            </span> */}

            <Span
              value="Delete"
              onClick={todoViewHandleDeleteButton}
              id={id}
              className={`todo-button-shared-style delete-button`}
              disableEditButton={disableEditButton}
              disabledClass="disabled"
            />
          </li>
        );
      })}
    </ul>
  );
};

// TodoView.propTypes = {
//   nameString: PropTypes.string.isRequired,
// };

TodoView.propTypes = {
  todoList: arrayOf(
    shape({
      id: string.isRequired,
      todo: string.isRequired,
    })
  ),
};

export default TodoView;

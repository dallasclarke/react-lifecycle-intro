import React from "react";
import { arrayOf, shape, number, string } from "prop-types";

import "./TodoView.css";
import Span from "../shared/Span";

const TodoView = ({
  todoList,
  appHandleDeleteTodo,
  showEditInput,
  appHandleEditTodo,
  appHandleEditTodoOnChange,
  editTodoValue,
  appHandleEditSubmit,
  disabledEditButton,
}) => {
  //console.log(todoList);

  const todoViewHandleDeleteButton = (id) => {
    //console.log("ID: ", id);
    appHandleDeleteTodo(id);
  };

  const todoEditHandleButton = (id) => {
    appHandleEditTodo(id);
  };

  const todoEditSubmitButton = (id) => {
    appHandleEditSubmit(id);
  };

  return (
    <ul style={{ listStyle: "none" }}>
      {todoList.map(({ id, todo, editToggle }) => {
        return (
          <li key={id} style={{ margin: 20 }}>
            {showEditInput && editToggle ? (
              <input
                type="text"
                name="editTodoValue"
                value={editTodoValue}
                onChange={appHandleEditTodoOnChange}
              />
            ) : (
              // <span>{todo}</span>
              <Span value={todo} />
            )}

            {showEditInput && editToggle ? (
              // <span
              //   onClick={() => todoEditSubmitButton(id)}
              //   className="todo-button-shared-style edit-button"
              // >
              //   Update
              // </span>
              <Span
                value={"Update"}
                id={id}
                onClick={todoEditSubmitButton}
                className="todo-button-shared-style edit-button"
              />
            ) : (
              // <span
              //   onClick={() => todoEditHandleButton(id)}
              //   className={`todo-button-shared-style edit-button ${
              //     disabledEditButton ? "disabled" : ""
              //   }`}
              // >
              //   Edit
              // </span>
              <Span
                value={"Edit"}
                id={id}
                onClick={todoEditHandleButton}
                className={`todo-button-shared-style edit-button`}
                disabledClass="disabled"
                disabledButton={disabledEditButton}
              />
            )}

            {/* <span
              onClick={() => todoViewHandleDeleteButton(id)}
              className={`todo-button-shared-style delete-button ${
                disabledEditButton ? "disabled" : ""
              }`}
            >
              Delete
            </span>  */}
            <Span
              value={"Delete"}
              id={id}
              onClick={todoViewHandleDeleteButton}
              className={`todo-button-shared-style delete-button`}
              disabledClass="disabled"
              disabledButton={disabledEditButton}
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

import React, { useReducer, useRef, useState } from "react";
import "./index.css";

const CREATE_TODO = "CREATE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const CLEAR_ALL_TODO = "CLEAR_ALL_TODO";
const MARK_ALL_TODO_COMPLETED = "MARK_ALL_TODO_COMPLETED";

const TodoAction = (state, action) => {
  switch (action.type) {
    case CREATE_TODO:
      const newTodo = {
        id: new Date().getTime(),
        title: action.payload.title,
        state: "pending",
      };
      state = [...state, newTodo];
      console.log(state);
      return state;
    case UPDATE_TODO:
      state = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title ?? todo.title,
            state: action.payload.state ?? todo.state,
          };
        }
        return todo;
      });
      return state;

    case MARK_ALL_TODO_COMPLETED:
      state = state.map((todo: any) => {
        return { ...todo, state: "completed" };
      });
      return state;
    case CLEAR_ALL_TODO:
      state = [];
      return state;
    default:
      return state;
  }
};

const ToDo = ({ todo, handleUpdate }) => {
  const [status, setStatus] = useState(false);
  const inputRef = useRef(null);
  const checkBoxRef = useRef(null);

  const handleSave = () => {
    const val = inputRef.current?.value;
    handleUpdate({ id: todo.id, title: val });
    setStatus(false);
  };

  const handleChangeState = () => {
    const state = checkBoxRef.current.checked ? "completed" : "pending";
    handleUpdate({ id: todo.id, state: state });
  };

  return (
    <li key={todo.id} className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          id={`todo-checkbox-${todo.id}`}
          disabled={status === true}
          checked={todo.state === "completed"}
          ref={checkBoxRef}
          onChange={() => handleChangeState()}
          aria-checked={todo.state === "completed"}
          aria-label={`Mark todo "${todo.title}" as completed`}
        />
        <label htmlFor={`todo-checkbox-${todo.id}`} className="sr-only">
          Mark {todo.title} as completed
        </label>
        {status === false ? (
          <span
            className={todo.state === "completed" ? "text-line-through" : ""}
            tabIndex={0}
            aria-label={todo.title}
          >
            {todo.title}
          </span>
        ) : (
          <input
            type="text"
            defaultValue={todo.title}
            required
            ref={inputRef}
            aria-label={`Edit todo: ${todo.title}`}
          />
        )}
      </div>
      {status === false ? (
        <button
          onClick={() => setStatus(true)}
          aria-label={`Edit todo: ${todo.title}`}
        >
          Edit
        </button>
      ) : (
        <button
          onClick={() => handleSave()}
          aria-label={`Save changes to todo: ${todo.title}`}
        >
          Save
        </button>
      )}
    </li>
  );
};

const ToDoList = ({ todos, editUpdate }) => {
  return (
    <ul className="todos-container" role="list" aria-label="Todo list">
      {todos.length > 0 &&
        todos.map((todo: any) => {
          return (
            <ToDo
              key={todo.id}
              todo={todo}
              handleUpdate={(val) => editUpdate(val)}
            />
          );
        })}
    </ul>
  );
};

const index = () => {
  const [todo, setTodo] = useState("");
  const [state, dispatch] = useReducer(TodoAction, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      dispatch({
        type: CREATE_TODO,
        payload: {
          title: todo,
        },
      });
      setTodo("");
    }
  };

  const handleEdit = (val) => {
    dispatch({
      type: UPDATE_TODO,
      payload: { ...val },
    });
  };

  return (
    <div className="todo-container" role="main" aria-label="Todo Application">
      <form onSubmit={(e) => handleSubmit(e)} aria-label="Add todo form">
        <label htmlFor="todo" className="sr-only">
          Todo
        </label>
        <input
          type="text"
          name="todo"
          id="todo"
          value={todo}
          required
          placeholder="Type your todo here..."
          onChange={(e) => setTodo(e.target.value)}
          aria-label="Type your todo here"
        />
        <button type="submit" aria-label="Create new todo">
          Create
        </button>
      </form>
      <ToDoList todos={state} editUpdate={(e) => handleEdit(e)} />
      <section className="actions-container" aria-label="Bulk actions">
        <button
          disabled={state.length === 0}
          onClick={() => dispatch({ type: CLEAR_ALL_TODO })}
          aria-label="Clear all todos"
        >
          Clear All
        </button>
        <button
          disabled={state.length === 0}
          onClick={() => dispatch({ type: MARK_ALL_TODO_COMPLETED })}
          aria-label="Mark all todos as completed"
        >
          Mark All Completed
        </button>
      </section>
    </div>
  );
};

export default index;

import React, { useState } from "react";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateTodo, setUpdateTodo] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: "Learn React",
      isCompleted: false,
    },
    {
      id: 2,
      todo: "Learn Redux",
      isCompleted: true,
    },
  ]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        todo: newTodo,
        isCompleted: false,
      },
    ]);
    setNewTodo("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    );
  };

  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  const handleSave = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id && updateTodo !== "") {
          todo.todo = updateTodo;
        }
        return todo;
      })
    );
    setIsUpdate(!isUpdate);
  };

  return (
    <>
      <h1>Simple Todos</h1>
      <form>
        <h2>Add todo</h2>
        <input
          type="text"
          name="newTodo"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </form>
      {todos.map((todo) => {
        return (
          <React.Fragment key={todo.id}>
            <p
              style={
                todo.isCompleted
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
              className="todoItem"
            >
              <span>{todo.id}. </span>
              {todo.todo}
            </p>
            <div className="form">
              {isUpdate && (
                <input
                  type="text"
                  value={updateTodo}
                  onChange={(e) => setUpdateTodo(e.target.value)}
                  disabled={!todo.id}
                />
              )}
              <div className="button-container">
                <button onClick={() => handleComplete(todo.id)}>
                  Complete
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => handleUpdate()}>
                  {isUpdate ? "Cancel" : "Update"}
                </button>
                {isUpdate && (
                  <button onClick={() => handleSave(todo.id)}>Save</button>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Todo;

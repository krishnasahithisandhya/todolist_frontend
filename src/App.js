import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const BASE_URL = "https://todolist-backend-39qv.onrender.com";

  // GET TODOS
  function getTodos() {
    fetch(`${BASE_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  }

  // ADD TODO
  function addTodo() {
    if (text.trim() === "") return;

    fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    })
      .then((res) => res.json())
      .then(() => {
        setText("");
        getTodos();
      })
      .catch((err) => console.log(err));
  }

  // DELETE TODO
  function deleteTodo(id) {
    fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
        getTodos();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />

      <button onClick={addTodo}>
        Add
      </button>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.text}

            <button onClick={() => deleteTodo(t._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
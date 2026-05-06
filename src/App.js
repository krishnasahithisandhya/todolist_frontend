import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // GET
  function getTodos() {
    fetch("http://localhost:1000/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err));
  }

  // ADD
  function addTodo() {
    if (text === "") return;

    fetch("http://localhost:1000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    })
      .then(res => res.json())
      .then(() => {
        setText("");
        getTodos();
      })
      .catch(err => console.log(err));
  }

  // DELETE
  function deleteTodo(text) {
    fetch("http://localhost:1000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    })
      .then(res => res.json())
      .then(() => getTodos())
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>
            {t.text}
            <button onClick={() => deleteTodo(t.text)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


import React from 'react';
//import './styles.css';
import TodoList from './TodoList'; // Import TodoList
import TodoForm from './TodoForm'; // Import TodoForm

function App() {
  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>Todo List</h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;

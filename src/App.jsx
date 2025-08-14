

import React, { useState } from 'react'; // Import useState hook
import TodoList from './TodoList'; // Import TodoList
import TodoForm from './TodoForm'; // Import TodoForm

//import './styles.css';

function App() {
  // Rename state variable & change initial value to empty array
  const [todoList, setTodoList] = useState([]);

  // Create the addTodo handler function
  const addTodo = (title) => {
    // Create a newTodo object with title & unique id
    const newTodo = {
      id: Date.now(),
      title: title,
    };
    // Update the todoList state with new todo
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>Todo List</h1>
        
        {/* Pass the addTodo function as prop */}
        <TodoForm onAddTodo={addTodo} />
         <TodoList todoList={todoList} />
      </div>
    </div>
  );
}

export default App;
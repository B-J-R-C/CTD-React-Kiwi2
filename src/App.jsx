



import React, { useState } from 'react'; // Import useState hook
import TodoList from './TodoList'; // Import TodoList
import TodoForm from './TodoForm'; // Import TodoForm

//import './styles.css';

function App() {
  // Creates new state value for new todo
  const [newTodo, setNewTodo] = useState("Text  will be displayed when the component first renders");

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>Todo List</h1>
        <TodoForm />
        
        {/* paragraph element that displays the current value of the newTodo state variable */}
        <p>{newTodo}</p>

        <TodoList />
        
      </div>
    </div>
  );
}

export default App;
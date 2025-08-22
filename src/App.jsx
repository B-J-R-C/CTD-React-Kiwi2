

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
      isCompleted: false,
    };
    // Update the todoList state with new todo
    setTodoList([...todoList, newTodo]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return {...todo, isCompleted: true };
      }
      return todo;
    }
  );
  setTodoList(updatedTodos);
  };

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>Todo List</h1>
        
        {/* Pass the addTodo function as prop */}
        <TodoForm onAddTodo={addTodo} />
         <TodoList todoList={todoList} onCompleteTodo={completeTodo}/>
      </div>
    </div>
  );
}

export default App;
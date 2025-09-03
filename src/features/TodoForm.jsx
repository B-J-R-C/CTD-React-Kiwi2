import React, { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel'; // Updated import path
// import './styles.css';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef("");

  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  
  const handleAddTodo = (event) => {
    event.preventDefault();
    
    // Use state variable instead of event.target
    const title = workingTodoTitle;
    
    // Pass title to the onAddTodo prop
    onAddTodo(title);

    // Clear input field by resetting the state
    setWorkingTodoTitle("");
    
    // Use ref to re-focus the input element
    todoTitleInput.current.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        label="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />
      <button type="submit" disabled={!workingTodoTitle}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;



import React, { useRef, useState } from 'react'; // Import useRef
// import './styles.css';

function TodoForm({ onAddTodo }) {
  // Invoke useRef to create a ref for the input element
  const todoTitleInput = useRef("");

  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  
  const handleAddTodo = (event) => {
    event.preventDefault();
    
    // Use the state variable instead of event.target
    const title = workingTodoTitle;
    
    // Pass the title to the onAddTodo prop
    onAddTodo(title);

    // Clear the input field by resetting the state
    setWorkingTodoTitle("");
    
    // Use the ref to re-focus the input element
    todoTitleInput.current.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input 
        type="text" 
        id="todoTitle" 
        name="title"
        ref={todoTitleInput} // Add the ref prop to the input
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
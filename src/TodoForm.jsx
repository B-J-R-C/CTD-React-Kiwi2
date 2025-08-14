import React, { useRef } from 'react'; // Import useRef
// import './styles.css';

function TodoForm({ onAddTodo }) {
  // Invoke useRef to create a ref for the input element
  const todoTitleInput = useRef("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    
    // Get the title value from the input
    const title = event.target.title.value;
    
    // Pass the title to the onAddTodo prop
    onAddTodo(title);

    // Clear the input field
    event.target.title.value = "";
    
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
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
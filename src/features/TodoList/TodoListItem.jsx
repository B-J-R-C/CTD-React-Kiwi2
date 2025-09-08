import React, { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  // Use useEffect to reset workingTitle when todo prop changes
  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  // Create handleCancel event helper
  const handleCancel = () => {
    setWorkingTitle(todo.title); // Reset the workingTitle to the original todo.title
    setIsEditing(false); // Set isEditing to false to exit edit mode
  };

  // Create a handleEdit event helper to update workingTitle state
  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };

  // Handler for new Update button
  const handleUpdate = () => {
    // Call onUpdateTodo prop with the new todo object
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        // If isEditing is true, display the TextInputWithLabel and buttons
        <>
          <TextInputWithLabel 
            value={workingTitle} 
            onChange={handleEdit}
          />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </>
      ) : (
        // If isEditing is false, display the existing form
        <form>
          <input
            type='checkbox'
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)}
          />
          <span onClick={() => setIsEditing(true)}>
            {todo.title}
          </span>
        </form>
      )}
    </li>
  );
}

export default TodoListItem;


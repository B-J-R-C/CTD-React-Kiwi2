import React, { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  // Create a new state variable, workingTitle, with todo.title as the initialValue
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  // Create a handleCancel event helper
  const handleCancel = () => {
    setWorkingTitle(todo.title); // Reset the workingTitle to the original todo.title
    setIsEditing(false); // Set isEditing to false to exit edit mode
  };

  // Create a handleEdit event helper that updates the workingTitle state
  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };

  return (
    <li>
      {isEditing ? (
        // If isEditing is true, display the TextInputWithLabel and a Cancel button
        <>
          <TextInputWithLabel 
            value={workingTitle} 
            onChange={handleEdit}
          />
          <button type="button" onClick={handleCancel}>
            Cancel
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

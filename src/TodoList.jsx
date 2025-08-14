

import React from 'react';
//import './styles.css'; // for when add a styles.css
import TodoListItem from './TodoListItem'; // Import the new component

// Destructure todoList from the props argument
function TodoList({ todoList }) {
  // local todos array removed

  return (
    <div>
      
      <ul>
        {/* Map over todoList - passed in as a prop */}
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
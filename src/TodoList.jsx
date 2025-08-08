

import React from 'react';
//import './styles.css'; // for when add a styles.css
import TodoListItem from './TodoListItem'; // Import the new component

function TodoList() {
  // Move the todos array over to TodoList.jsx
  const todos = [
    { id: 1, text: 'review resources' },
    { id: 2, text: 'take notes'  },
    { id: 3, text: 'code out app' },
  ];

return (
    <div>
     
      <ul>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo.text} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
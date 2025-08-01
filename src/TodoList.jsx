

import React from 'react';
//import './styles.css'; // for when add a styles.css

function TodoList() {
  // Move the todos array over to TodoList.jsx
  const todos = [
    { id: 1, text: 'review resources' },
    { id: 2, text: 'take notes'  },
    { id: 3, text: 'code out app' },
  ];

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
           <li key={todo.id}>{todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;


import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  return (
    <div>
      {filteredTodoList.length === 0 ? (
        <p>Add a todo above to get started</p>
      ) : (
      <ul>
        {filteredTodoList.map((todo) => (
          // Pass the entire todo object, not just the title string
          <TodoListItem key={todo.id} todo={todo} 
          onCompleteTodo={onCompleteTodo}
          />
        ))}
      </ul>
      )}
    </div>
  );
}

export default TodoList;
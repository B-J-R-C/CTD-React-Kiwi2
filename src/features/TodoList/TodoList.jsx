

import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, isLoading }) {
  if (isLoading) {
    return <p>Todo list loading...</p>;
  }

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  return (
    <div>
      {filteredTodoList.length === 0 ? (
        <p>Add a todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
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
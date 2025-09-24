

import React from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css'; // Import the CSS module

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
        <ul className={styles.todoList}>
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
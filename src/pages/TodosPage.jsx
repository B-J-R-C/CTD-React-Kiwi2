import React, { useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Import hooks
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodosViewForm from '../components/TodosViewForm';
import styles from './TodosPage.module.css'; // New styles import

const itemsPerPage = 15; // Define constant for items per page

const TodosPage = ({

  todoList,
  addTodo,
  isSaving,
  completeTodo,
  updateTodo,
  isLoading,
  sortField,
  setSortField,
  setSortDirection,
  sortDirection,
  queryString,
  setQueryString,
  errorMessage,
  clearError,
}) => {
  // --- PAGINATION CALCULATIONS AND HANDLERS ---
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // Hook
  

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  //Filter the todo list based on query

  const filteredTodoList = useMemo(() => {
    if (!queryString) return todoList;
    const searchLower = queryString.toLowerCase();
    return todoList.filter(todo => todo.title.toLowerCase().includes(searchLower));
  }, [todoList, queryString]);

  //Calctotal pages
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  //Calc indexs
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  //Slice
  const currentTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfLastTodo);


  const handlePreviousPage = () => {
    const prevPage = Math.max(1, currentPage - 1);
    setSearchParams({ page: prevPage.toString() });
  };


  const handleNextPage = () => {
    const nextPage = Math.min(totalPages, currentPage + 1);
    setSearchParams({ page: nextPage.toString() });
  };
  
  // --- EFFECT FOR INVALID URL PARAMETERS ---
  useEffect(() => {
    // Wrap contents
    if (totalPages > 0) {
      const isValidNumber = !isNaN(currentPage) && typeof currentPage === 'number';

      if (!isValidNumber || currentPage < 1 || currentPage > totalPages) {
        navigate('/'); 
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <div className={styles.todosPageContainer}>
      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
          <button onClick={clearError}>Clear</button>
        </div>
      )}
      
      <TodoForm addTodo={addTodo} isSaving={isSaving} />
      
      <TodosViewForm 
        sortField={sortField}
        setSortField={setSortField}
        setSortDirection={setSortDirection}
        sortDirection={sortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      
      {/* Pass paginated (currentTodos) to TodoList */}
      <TodoList 
        todoList={currentTodos} 
        completeTodo={completeTodo} 
        updateTodo={updateTodo} 
        isLoading={isLoading} 
      />

      {/* --- PAGINATION UI CONTROLS --- */}
      {/* addd details */}
      {totalPages > 1 && (
        <div className={styles.paginationControls}>
          <button 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1} // Disable if on the first page
          >
            Previous
          </button>
          
          <span>
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages} // Disable if on the last page
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TodosPage;
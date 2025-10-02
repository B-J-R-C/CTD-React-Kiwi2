import React, { useState, useEffect, useCallback, useReducer } from 'react'; // Import useReducer
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css'; // Import the CSS module

// Import and alias the reducer logic
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

// Define the Airtable URL base outside of the component function
const airtableBaseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  // USE REDUCER SETUP
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  
  
  const { todoList, isLoading, isSaving, errorMessage } = todoState;

  // Existing state variables for sorting/filtering still outside 
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${airtableBaseUrl}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      // 1. useEffect: Replace setIsLoading(true)
      dispatch({ type: todoActions.fetchTodos }); 
      
      const options = {
        method: "GET",
        headers: {
          "Authorization": token,
        },
      };

      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(`Error: ${resp.status}`);
        }
        const { records } = await resp.json();
        // 2. useEffect: Replace setTodoList and mapping logic
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        // 3. useEffect: Replace setErrorMessage
        dispatch({ type: todoActions.setLoadError, error: { message: error.message } });
      }
      
    };
    fetchTodos();
  }, [token, encodeUrl]);

  const addTodo = async (title) => {
    // 1. addTodo: Replace setIsSaving(true)
    dispatch({ type: todoActions.startRequest }); 
    
    const payload = {
      records: [
        {
          fields: {
            title: title,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(airtableBaseUrl, options);
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }
      const { records } = await resp.json();
      
      // 2. addTodo: Replace setTodoList and savedTodo logic
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      console.log(error);
      // 3. addTodo: Replace setErrorMessage and setIsSaving(false)
      dispatch({ type: todoActions.setLoadError, error: { message: error.message } });
    }
    
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    
    // 1. updateTodo: Replace setTodoList (Optimistic UI Update)
    dispatch({ type: todoActions.updateTodo, editedTodo });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(airtableBaseUrl, options);
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }
      
    } catch (error) {
      console.log(error);
      const errorMessage = `${error.message}. Reverting todo...`;
      // 2. updateTodo: Replace setErrorMessage and setTodoList (Revert UI)
      dispatch({ 
        type: todoActions.revertTodo, 
        originalTodo, 
        error: { message: errorMessage } 
      });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);
    if (!originalTodo) return; // a check
    
    // 1. completeTodo: Replace setTodoList (Optimistic UI Update)
    dispatch({ type: todoActions.completeTodo, id });

    const payload = {
      records: [
        {
          id: id,
          fields: {
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(airtableBaseUrl, options);
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = `${error.message}. Reverting completion...`;
      // 2. completeTodo: Replace setErrorMessage and setTodoList (Revert UI)
      dispatch({ 
        type: todoActions.revertTodo, 
        originalTodo,
        error: { message: errorMessage } 
      });
    }
  };

  return (
     <div className={styles.appContainer}>
      <div className={styles.todoApp}> {/* check todoApp class in App.module.css */}
        <h1>Todo List</h1>
        <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
        <TodoList
          todoList={todoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
          isLoading={isLoading}
        />
        <hr />
        <TodosViewForm
          sortField={sortField}
          setSortField={setSortField}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
          queryString={queryString}
          setQueryString={setQueryString}
        />
        {errorMessage && (
          <div className={styles.errorMessage}>
            <hr />
            <p>{errorMessage}</p>
            {/* Dispatch action - clear on click */}
            <button onClick={() => dispatch({ type: todoActions.clearError })}>Dismiss</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
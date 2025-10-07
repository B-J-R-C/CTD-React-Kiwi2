import React, { useState, useEffect, useCallback, useReducer } from 'react';
// Imports routing and URL params
import { useLocation, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

// Import components and reducers
import Header from './shared/Header';
import TodosPage from './pages/TodosPage'; 
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound'; 

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

// Airtable URL
const airtableBaseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  // HEADER/NAVIGATION LOGIC
  const [title, setTitle] = useState('Todo List');
  const location = useLocation(); 

  // Create useEffect to set the title based on location.pathname
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Todo List');
        break;
      case '/about':
        setTitle('About');
        break;
      default:
        setTitle('Not Found');
        break;
    }
  }, [location]); 

  // USE REDUCER SETUP
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  
  const { todoList, isLoading, isSaving, errorMessage } = todoState;

  //state variables for sorting/filtering 
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
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error: { message: error.message } });
      }
      
    };
    fetchTodos();
  }, [token, encodeUrl]);

  const addTodo = async (title) => {
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
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActions.setLoadError, error: { message: error.message } });
    }
    
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    
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
      dispatch({ 
        type: todoActions.revertTodo, 
        originalTodo, 
        error: { message: errorMessage } 
      });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);
    if (!originalTodo) return; 
    
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
      dispatch({ 
        type: todoActions.revertTodo, 
        originalTodo,
        error: { message: errorMessage } 
      });
    }
  };

  return (
     <div className={styles.appContainer}>
      <div className={styles.todoApp}> 
        <Header title={title} />
        
        {/* Routes wrapper */}
        <Routes>
          {/* Main Todo List page, all state/handlers */}
          <Route path="/" element={
            <TodosPage
              addTodo={addTodo}
              isSaving={isSaving}
              todoList={todoList}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
              isLoading={isLoading}
              sortField={sortField}
              setSortField={setSortField}
              setSortDirection={setSortDirection}
              sortDirection={sortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
              errorMessage={errorMessage}
              clearError={() => dispatch({ type: todoActions.clearError })}
            />
          } />
          
          {/* About page route */}
          <Route path="/about" element={<AboutPage />} />

          {/* Wildcard route for 404 - Not Found */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

export const actions = {
    // actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    // found in useEffect and addTodo 
    setLoadError: 'setLoadError',
    // actions in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    // helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    // reverts todos when fail
    revertTodo: 'revertTodo',
    // dismiss Error button
    clearError: 'clearError',
};


export const initialState = {
  todoList: [],
  isLoading: true, 
  isSaving: false,
  errorMessage: "",
};


export function reducer(state = initialState, action) {
  switch (action.type) {
    
   
    // useEffect (Pessimistic UI)
    
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
        errorMessage: "", // Clear previous error
      };

    case actions.loadTodos: {
      const fetchedTodos = action.records.map((record) => {
        const todo = {
          id: record.id,
          ...record.fields,
        };
       
        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }
        return todo;
      });
      return {
        ...state,
        todoList: fetchedTodos,
        isLoading: false,
      };
    }

    // setLoadError 
    
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.addTodo: {
      const { records } = action;
      
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }
      
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

    
    case actions.revertTodo: {
        // action.originalTodo holds  state of todo before optimistic update
        const updatedTodos = state.todoList.map((todo) =>
            todo.id === action.originalTodo.id ? action.originalTodo : todo
        );
        
        return {
            ...state,
            todoList: updatedTodos,
            
            isSaving: false,
            // Set error message
            errorMessage: action.error?.message || state.errorMessage,
        };
    }

    // updating a todo (Optimistic Update)
    case actions.updateTodo: {
        const updatedTodos = state.todoList.map((todo) =>
            todo.id === action.editedTodo.id ? action.editedTodo : todo
        );

        return {
            ...state,
            todoList: updatedTodos,

            errorMessage: action.error?.message || state.errorMessage,
        };
    }
    
    // Logic for completing a todo (Optimistic Update)
    case actions.completeTodo: {
      const originalTodo = state.todoList.find((todo) => todo.id === action.id);
      if (!originalTodo) return state; // Safety check

      const updatedTodo = { ...originalTodo, isCompleted: true };

      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.id ? updatedTodo : todo
      );

      return {
        ...state,
        todoList: updatedTodos,
      };
    }

    // Common Error / Dismiss Error


    // Handles errors
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
        isSaving: false,
      };
      
    case actions.clearError:
      return {
        ...state,
        errorMessage: "",
      };

    default:
      return state;
  }
}

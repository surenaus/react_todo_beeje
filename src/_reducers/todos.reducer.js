import { todoConstants } from '../_constants';

let intial_state = {
  items: {
    tasks: [],
    total_task_count: 1,
  },
  loading: false,
}

export function todos(state = intial_state , action) {
  switch (action.type) {
    case todoConstants.FETCH_REQUEST:
      return {
        items: [],
        loading: true
      };
    case todoConstants.FETCH_SUCCESS:
      return {
        items: action.todos
      };
    case todoConstants.FETCH_ERROR:
      return { 
        error: action.error
      };
    
    case todoConstants.ADD_REQUEST:
      return {
        loading: true
      };
    case todoConstants.ADD_SUCCESS:      
      return {
        items: action.todo
      };
    case todoConstants.ADD_ERROR:
      return { 
        error: action.error
      };
    
    case todoConstants.EDIT_REQUEST:
      return {
        loading: true
      };
    case todoConstants.EDIT_SUCCESS:      
      return {
        items: action.todo
      };
    case todoConstants.EDIT_ERROR:
      return { 
        error: action.error
      };
    
    case todoConstants.COMPLETED_TODO_REQUEST:
      return {
        loading: true
      };
    case todoConstants.COMPLETED_TODO_SUCCESS:      
      return {
        items: action.todo
      };
    case todoConstants.COMPLETED_TODO_EROOR:
      return { 
        error: action.error
      };
    
    case todoConstants.CHANGE_STATUS_REQUEST:
      return {
        loading: true
      };
    case todoConstants.CHANGE_STATUS_SUCCESS:
      return {
        items: action.todo
      };
    case todoConstants.CHANGE_STATUS_ERROR:
      return { 
        error: action.error
      };
    
    case todoConstants.SEARCH_BY:
      return {
        items: action.todos
      }
    case todoConstants.SEARCH_BY_EMAIL:
      return {
        items: action.todos
      };
    case todoConstants.SEARCH_BY_USERNAME:
      return {
        items: action.todos
      };
    case todoConstants.SEARCH_BY_STATUS:
      return { 
        items: action.todos
      };
    case todoConstants.SEARCH_BY_ID:
      return { 
        items: action.todos
      };
    
    default:
      return state;
  }

};
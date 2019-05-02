import { todoConstants } from '../_constants';
import { todoService } from '../_services';
import { history } from '../_helpers/history'
// import { alertActions } from '.';

export const todoActions = {
    getAll,
    addTodo,
    editTodo,
    searchBy,
    changeStatus
};

function getAll(page) {
    return dispatch => {
        // dispatch(request());
        todoService.getAll(page)
            .then(
                todos => {
                    // preparing for pagination 
                    let total_task_count = todos.message.total_task_count
                    let newtotal = total_task_count / 3
                    if (total_task_count % 3 !== 0) newtotal = newtotal + 1
                    todos.message.total_task_count = newtotal
                    dispatch(success(todos.message))
                },
                error => dispatch(failure(error))
            );
    };

    // function request() { return { type: todoConstants.FETCH_REQUEST } }
    function success(todos) { return { type: todoConstants.FETCH_SUCCESS, todos } }
    function failure(error) { return { type: todoConstants.FETCH_ERROR, error } }
}
function searchBy(page, param, direction) {
    return dispatch => {
        // dispatch(request());
        // console.log('actions: ',page, param, direction)
        todoService.searchBy(page, param, direction)
            .then(
                todos => {
                    // preparing for pagination 
                    let total_task_count = todos.message.total_task_count
                    let newtotal = total_task_count / 3
                    if (total_task_count % 3 !== 0) newtotal = newtotal + 1
                    todos.message.total_task_count = newtotal
                    dispatch(success(todos.message))
                },
                error => dispatch(failure(error))
            );
    };
    // function request() { return { type: todoConstants.FETCH_REQUEST } }
    function success(todos) { return { type: todoConstants.SEARCH_BY, todos } }
    function failure(error) { return { type: todoConstants.SEARCH_ERROR, error } }
}
function addTodo(forn) {
    return dispatch => {
        // dispatch(request());

        todoService.addTodo(forn)
            .then(
                todo => {
                    history.push('/list');
                    dispatch(success(todo.message))
                },
                error => dispatch(failure(error))
            );
    };

    // function request() { return { type: todoConstants.ADD_REQUEST } }
    function success(todo) { return { type: todoConstants.ADD_SUCCESS, todo } }
    function failure(error) { return { type: todoConstants.ADD_ERROR, error } }
}

function editTodo(page) {
    return dispatch => {
        // dispatch(request());

        todoService.addTodo(page)
            .then(
                todos => {
                    dispatch(success(todos.message))
                },
                error => dispatch(failure(error))
            );
    };

    // function request() { return { type: todoConstants.EDIT_REQUEST } }
    function success(todos) { return { type: todoConstants.EDIT_SUCCESS, todos } }
    function failure(error) { return { type: todoConstants.EDIT_ERROR, error } }
}

function changeStatus() {
    return dispatch => {
        dispatch(success(
            {
                message: {
                    id: '1',
                    status: '01'
                }
            }
        ))
    };

    function success(todo) { return { type: todoConstants.CHANGE_STATUS_SUCCESS, todo } }
}
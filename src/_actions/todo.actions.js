import { todoConstants } from '../_constants';
import { todoService } from '../_services';
import { history } from '../_helpers/history'
// import { alertActions } from '.';

export const todoActions = {
    getAll,
    addTodo,
    editTodo,
    searchBy,
    changeStatus,
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
function addTodo(form) {
    return dispatch => {

        todoService.addTodo(form)
            .then(
                todo => {
                    (success(todo.message))
                    dispatch(todoActions.getAll(localStorage.getItem('page')))
                    history.push('/list')
                },
                error => dispatch(failure(error))
            );
    };

    // function request() { return { type: todoConstants.ADD_REQUEST } }
    function success(todo) { return { type: todoConstants.ADD_SUCCESS, todo } }
    function success(todo) { return { type: todoConstants.ADD_SUCCESS, todo } }

    function failure(error) { return { type: todoConstants.ADD_ERROR, error } }
}

function editTodo(form, id) {
    var md5 = require('md5');

    return dispatch => {
        form.append("token", "beejee");
        let val = 'email=' + encodeURIComponent(form.get('email'))
            + '&status=' + form.get('status')
            + '&text=' + encodeURIComponent(form.get('text'))
            + '&username=' + encodeURIComponent(form.get('username'))
            + '&token=' + form.get('token');

        form.append("signature", md5(val));
        todoService.editTodo(form, id)
            .then(
                todos => {                    
                    (success(todos.message))
                    dispatch(todoActions.getAll(localStorage.getItem('page')))
                    history.push('/list')
                },
                error => dispatch(failure(error))
            );
    };

    // function request() { return { type: todoConstants.EDIT_REQUEST } }
    function success(todos) { return { type: todoConstants.EDIT_SUCCESS, todos } }
    function failure(error) { return { type: todoConstants.EDIT_ERROR, error } }
}

function changeStatus(form, id) {
    var md5 = require('md5');
    
    return dispatch => {
        form.append("token", "beejee");
        let val = 'status=' + form.get('status')
            + '&token=' + form.get('token');

        form.append("signature", md5(val));
        todoService.editTodo(form, id)
            .then(
                todos => {                    
                    (success(todos.message))
                    dispatch(todoActions.getAll(1))
                    history.push('/list')
                },
                error => dispatch(failure(error))
            );
    };

    // function request() { return { type: todoConstants.EDIT_REQUEST } }
    function success(todos) { return { type: todoConstants.COMPLETED_TODO_SUCCESS, todos } }
    function failure(error) { return { type: todoConstants.COMPLETED_TODO_EROOR, error } }
}

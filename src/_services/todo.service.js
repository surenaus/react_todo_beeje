import axios from 'axios'
const url = 'https://uxcandy.com/~shapoval/test-task-backend/'
export const todoService = {
    getAll,
    addTodo,
    searchBy,
};

function searchBy(page, param, direction)
{
    const requestOptions = {
        method: 'GET',
    };
    const data = {
        page: page,
        sort_field: param,
        sort_direction: direction,
    };
    // console.log('service: ', page, param, direction)
    return fetch(
        url + `?developer=SuRen&page=${encodeURIComponent(data.page)}&sort_field=${encodeURIComponent(data.param)}&sort_direction=${encodeURIComponent(data.direction)}`
        , requestOptions).then(handleResponse);
}

function getAll(page) {
    const requestOptions = {
        method: 'GET',
    };
    const data = {
        page: page,
    };

    return fetch(
      url + `?developer=SuRen&page=${encodeURIComponent(data.page)}`
        , requestOptions).then(handleResponse);
}

function addTodo(form) {    
    return axios({
        url: url + 'create?developer=SuRen',
        crossDomain: true,
        method: 'POST',
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json",
      }).then(data => { return data })
    
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log(data)
        if (!response.ok) {
            // if (response.status === 401)
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
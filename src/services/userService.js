import { authHeader } from 'helpers/authHeader';
import { handleResponse } from 'helpers/handle-response'


const apiUrl = process.env.REACT_APP_MOCK_URL

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}
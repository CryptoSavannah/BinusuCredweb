import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

// import config from 'config';
import { handleResponse } from 'helpers/handle-response';

//remove this after
const remoteApiUrl = "http://test.credit.binusu.kapsonlabs.ml/api/v1"
console.log(remoteApiUrl)

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('data')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {

    // return axios.post(`${remoteApiUrl}/auth/login/`, { username, password })
    //     .then(res => {
    //         let user = res.data.data.user_details
    //         console.log(res.data.data)
    //         localStorage.setItem('currentUser', user);
    //         currentUserSubject.next(user);
    //         return user
    //     })
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${remoteApiUrl}/auth/login/`, requestOptions)
        .then(results => {
            return results.json()
        })
        .then(data => {
            const user = data.data;
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('data');
    currentUserSubject.next(null);
}
import axios from 'axios' ;
const ROOT_URL = 'http://localhost:3000' ;
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE
 } from './types';


export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email and password to server login path
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // Update state to indicate that the user is authenticated
        dispatch({ type: AUTH_USER });

        // Save the returned JWT
        localStorage.setItem('token', response.data.token) ;
        // Redirect to /feature
        browserHistory.push('/dashboard');

      })
      .catch( () => {
        //If request is bad.
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}


export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/dashboard');
            })
            .catch(serve => {
                dispatch(authError(serve.response.data.error))
            });
    }
}

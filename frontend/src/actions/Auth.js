import { login, signup, getCurrentUser } from 'util/APIUtils';
import { ACCESS_TOKEN } from 'constants/Config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin() {
  return {
    type: LOGIN_REQUEST
  }
}

function receiveLogin(user, notification) {
  return {
    type: LOGIN_SUCCESS,
    user,
    notification
  }
}

function rejectLogin(notification) {
  return {
    type: LOGIN_FAILURE,
    notification
  }
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

function requestSignup() {
  return {
    type: SIGNUP_REQUEST
  }
}

function receiveSignup(notification) {
  return {
    type: SIGNUP_SUCCESS,
    notification
  }
}

function rejectSignup(notification) {
  return {
    type: SIGNUP_FAILURE,
    notification
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function receiveLogout(notification) {
  return {
    type: LOGOUT_SUCCESS,
    notification
  }
}

export const LOADCURRENTUSER_REQUEST = 'LOADCURRENTUSER_REQUEST'
export const LOADCURRENTUSER_SUCCESS = 'LOADCURRENTUSER_SUCCESS'
export const LOADCURRENTUSER_FAILURE = 'LOADCURRENTUSER_FAILURE'

function requestLoadCurrentUser() {
  return {
    type: LOADCURRENTUSER_REQUEST
  }
}

function receiveLoadCurrentUser(user) {
  return {
    type: LOADCURRENTUSER_SUCCESS,
    user
  }
}

function rejectLoadCurrentUser() {
  return {
    type: LOADCURRENTUSER_FAILURE
  }
}

export function loginUser(loginRequest, history) {
  return dispatch => {
    dispatch(requestLogin());

    login(loginRequest, history)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        getCurrentUser()
          .then(response => {
            dispatch(receiveLogin(response, ({
              type: "Success",
              description: "You're successfully logged in.",
            })));
            history.push('/');
          }).catch(error => {
            dispatch(rejectLogin({
              type: "Error",
              description: "Sorry, something went wrong. Please try again."
            }))
          }
          )
      }).catch(error => {
        if (error.status === 401) {
          dispatch(rejectLogin({
            type: "Error",
            description: 'Your Username or Password is incorrect. Please try again.'
          }));
        } else {
          dispatch(rejectLogin({
            type: "Error",
            description: 'Sorry, Something went wrong. Please try again.'
          }));
        }
      })
  }
}

export function signupUser(signupRequest, history) {
  return dispatch => {
    dispatch(requestSignup());

    signup(signupRequest, history)
      .then(response => {
        dispatch(receiveSignup(response, ({
          type: "Success",
          description: "Thank you! You're successfully registered. Please Login to continue!",
        })));
        history.push('/login-page');
      }).catch(error => {
        dispatch(rejectSignup({
          type: "Error",
          description: "Sorry, something went wrong. Please try again."
        }))
      });
  }
}

export function logoutUser(history) {
  return dispatch => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(receiveLogout({
      type: 'Success',
      description: "You're successfully logged out."
    }));
    history.push('/');
  }
}

export function loadCurrentUser() {
  return dispatch => {
    dispatch(requestLoadCurrentUser());
    getCurrentUser()
      .then(response => {
        dispatch(receiveLoadCurrentUser(response));
      }).catch(error => {
        dispatch(rejectLoadCurrentUser())
      }
      )
  }
}

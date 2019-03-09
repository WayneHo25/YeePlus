import { login, getCurrentUser } from 'util/APIUtils';
import { ACCESS_TOKEN } from 'constants';

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
              notificationType: "success",
              message: 'Polling App',
              description: "You're successfully logged in.",
            })));
            history.push('/');
          }).catch(error => {
            dispatch(rejectLogin({
              notificationType: "error",
              message: 'Polling App',
              description: error.message || "Sorry! Something went wrong. Please try again!"
            }))
          }
          )
      }).catch(error => {
        if (error.status === 401) {
          dispatch(rejectLogin({
            notificationType: "error",
            message: 'Polling App',
            description: 'Your Username or Password is incorrect. Please try again!'
          }));
        } else {
          dispatch(rejectLogin({
            notificationType: "error",
            message: 'Polling App',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          }));
        }
      })
  }
}

export function logoutUser(history) {
  return dispatch => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(receiveLogout({
      notificationType: 'success',
      message: 'Polling App',
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
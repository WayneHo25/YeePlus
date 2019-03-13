import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  LOADCURRENTUSER_REQUEST, LOADCURRENTUSER_SUCCESS, LOADCURRENTUSER_FAILURE
} from 'actions/Auth';

function auth(state = {
  isFetching: false,
  isAuthenticated: false,
  currentUser: null,
  notificationHolder: {type:"", description:""}
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        currentUser: action.user,
        notificationHolder: action.notification
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        notificationHolder: action.notification
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        currentUser: null,
        notificationHolder: action.notification
      })
    case LOADCURRENTUSER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOADCURRENTUSER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        currentUser: action.user
      })
    case LOADCURRENTUSER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

export default auth;

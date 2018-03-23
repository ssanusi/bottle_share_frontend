import api from '../api/adapter'

export const LOGIN = "LOGIN"
export const CREATE_USER = "CREATE_USER"
export const FIND_USER = "FIND_USER"
export const LOGOUT = "LOGOUT"
export const GET_USERS = "GET_USERS"
export const GET_CURRENT_USER = "GET_CURRENT_USER"

export const login = (email, password) => {
  return function(dispatch) {
    return api.login(email, password)
      .then(json => dispatch({
        type: LOGIN,
        payload: json
      })
    )
  }
}

export const logout = (history) => {
  history.push("/login")
  return { type: LOGOUT }
}

export const createUser = (user) => {
  return function(dispatch) {
    return api.createUser(user)
      .then(json => dispatch({
        type: CREATE_USER,
        payload: json
      })
    )
  }
}

export const findUser = (token) => {
  return function(dispatch) {
    return api.findUser(token)
      .then(json => dispatch({
        type: FIND_USER,
        payload: json
      })
    )
  }
}

export const getAllUsers = () => {
  return function(dispatch) {
    return api.getAllUsers()
      .then(json => dispatch({
        type: GET_USERS,
        payload: json
      })
    )
  }
}

export const getCurrentUser = (id) => {
  return function(dispatch) {
    return api.getCurrentUser(id)
      .then(json => dispatch({
        type: GET_CURRENT_USER,
        payload: json
      })
    )
  }
}
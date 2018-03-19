import { LOGIN, LOGOUT, CREATE_USER, FIND_USER, GET_USERS } from '../actions/users'
import { GET_EVENTS } from '../actions/events'

const initialState = {
  loggedIn: false,
  userName: '',
  userID: '',
  users: [],
  events: []
}

function rootReducer(state=initialState, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token)
        return {...state,
          loggedIn: true,
          userName: action.payload.user.name,
          userID: action.payload.user.id
        }
      } else {
        localStorage.removeItem("token")
        return state
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {...state,
        loggedIn: false,
        userName: '',
        userID: ''
      }
    case CREATE_USER:
      localStorage.setItem("token", action.payload.token)
      return {...state,
        loggedIn: true,
        userName: action.payload.user.name,
        userID: action.payload.user.id
      }
    case FIND_USER:
      return {...state,
        loggedIn: true,
        userName: action.payload.user.name,
        userID: action.payload.user.id
      }
    case GET_USERS:
      return {...state,
        users: action.payload
      }
    case GET_EVENTS:
      console.log(action.payload)
      return {...state,
        events: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
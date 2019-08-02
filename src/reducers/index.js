import { combineReducers } from 'redux'
import movies from './movies'
import auth from './auth'
import user from './user'

export default combineReducers({
  movies,
  auth,
  user
})

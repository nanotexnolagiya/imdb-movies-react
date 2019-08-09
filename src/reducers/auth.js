import update from 'immutability-helper'
import {
  FETCH_USER_SESSION_REQUEST,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION_ERROR,
  SET_USER_LOGGED_IN
} from '../constants'

const initialState = {
  userLoggedIn: false,
  session_id: localStorage.getItem('session_id') || null,
  loading: false,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_SESSION_REQUEST:
      return update(state, {
        loading: { $set: true }
      })
    case FETCH_USER_SESSION_SUCCESS:
      return update(state, {
        loading: { $set: false },
        session_id: { $set: payload }
      })
    case FETCH_USER_SESSION_ERROR:
      return update(state, {
        error: { $set: payload },
        loading: { $set: false }
      })
    case SET_USER_LOGGED_IN:
      return update(state, {
        userLoggedIn: { $set: payload },
        session_id: { $set: payload ? state.session_id : null }
      })

    default:
      return state
  }
}

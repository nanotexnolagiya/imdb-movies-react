import update from 'immutability-helper'
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../constants'

const initialState = {
  user: null,
  loading: false,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_REQUEST:
      return update(state, {
        loading: { $set: true }
      })
    case FETCH_USER_SUCCESS:
      return update(state, {
        user: { $set: payload },
        loading: { $set: false }
      })
    case FETCH_USER_ERROR:
      return update(state, {
        loading: { $set: false },
        error: { $set: payload }
      })

    default:
      return state
  }
}

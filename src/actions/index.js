import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_COMPLETE,
  FETCH_MOVIES_BY_CATEGORY,
  FETCH_MOVIES_BY_CATEGORY_MORE,
  FETCH_USER_SESSION_REQUEST,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION_ERROR,
  SET_USER_LOGGED_IN,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../constants'

export const moviesRequested = () => ({
  type: FETCH_MOVIES_REQUEST
})

export const moviesLoaded = payload => ({
  type: FETCH_MOVIES_SUCCESS,
  payload
})

export const moviesError = error => ({
  type: FETCH_MOVIES_ERROR,
  payload: error
})

export const moviesComplate = () => ({
  type: FETCH_MOVIES_COMPLETE
})

export const moviesByCategory = payload => ({
  type: FETCH_MOVIES_BY_CATEGORY,
  payload
})

export const moviesByCategoryMore = payload => ({
  type: FETCH_MOVIES_BY_CATEGORY_MORE,
  payload
})

export const userSessionSuccess = payload => ({
  type: FETCH_USER_SESSION_SUCCESS,
  payload
})

export const userSessionRequest = () => ({
  type: FETCH_USER_SESSION_REQUEST
})

export const userSessionError = payload => ({
  type: FETCH_USER_SESSION_ERROR,
  payload
})

export const setUserLoggedIn = payload => ({
  type: SET_USER_LOGGED_IN,
  payload
})

export const userRequested = () => ({ type: FETCH_USER_REQUEST })
export const userSuccess = payload => ({ type: FETCH_USER_SUCCESS, payload })
export const userError = payload => ({ type: FETCH_USER_ERROR, payload })

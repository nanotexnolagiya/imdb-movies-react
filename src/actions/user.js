import {
  FETCH_USER_SESSION_REQUEST,
  FETCH_USER_SESSION_SUCCESS,
  FETCH_USER_SESSION_ERROR,
  SET_USER_LOGGED_IN,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../constants'

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

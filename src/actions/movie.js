import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_COMPLETE,
  FETCH_MOVIES_BY_CATEGORY,
  FETCH_MOVIES_BY_CATEGORY_MORE,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_SEARCH
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

export const movieByIdLoaded = payload => ({
  type: FETCH_MOVIE_SUCCESS,
  payload
})

export const moviesSearch = payload => ({
  type: FETCH_MOVIE_SEARCH,
  payload
})

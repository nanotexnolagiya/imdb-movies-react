import update from 'immutability-helper'
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

const initialState = {
  popular: [],
  top_rated: [],
  upcoming: [],
  now_playing: [],
  movies: [],
  searchMovies: [],
  movie: null,
  pages: null,
  results: null,
  loading: true,
  error: null
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_REQUEST:
      return update(state, {
        loading: { $set: true }
      })

    case FETCH_MOVIES_SUCCESS:
      return update(state, {
        movies: { $set: payload.results },
        pages: { $set: payload.total_pages },
        results: { $set: payload.total_results },
        loading: { $set: false }
      })

    case FETCH_MOVIE_SEARCH:
      return update(state, {
        searchMovies: { $set: payload },
        loading: { $set: false }
      })

    case FETCH_MOVIES_BY_CATEGORY:
      return update(state, {
        [payload.category]: { $set: payload.results }
      })

    case FETCH_MOVIES_BY_CATEGORY_MORE:
      return update(state, {
        movies: { $push: payload.results },
        pages: { $set: payload.total_pages },
        results: { $set: payload.total_results },
        loading: { $set: false }
      })

    case FETCH_MOVIES_ERROR:
      return update(state, {
        error: { $set: payload },
        loading: { $set: false }
      })

    case FETCH_MOVIES_COMPLETE:
      return update(state, {
        loading: { $set: false }
      })

    case FETCH_MOVIE_SUCCESS:
      return update(state, {
        movie: { $set: payload },
        loading: { $set: false }
      })

    default:
      return state
  }
}

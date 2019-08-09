import instance from '../instance'

export default class MovieServices {
  api_key = '0205eaf82926ff1480160b868e96429e'
  language = 'en-US'

  async getMovieByCategory(category, page) {
    try {
      const res = await instance.get(`/movie/${category}`, {
        params: {
          api_key: this.api_key,
          language: this.language,
          page
        }
      })

      return res.data
    } catch (error) {
      throw error
    }
  }

  async getMovieById(id) {
    try {
      const res = await instance.get(`/movie/${id}`, {
        params: {
          api_key: this.api_key,
          language: this.language
        }
      })

      return res.data
    } catch (error) {
      throw error
    }
  }

  async getAccountStatesByMovieId(id, session_id) {
    try {
      if (!session_id) return false
      const res = await instance.get(`/movie/${id}/account_states`, {
        params: {
          api_key: this.api_key,
          language: this.language,
          session_id
        }
      })
      return res.data
    } catch (error) {
      throw error
    }
  }

  async getCreditsByMovieId(id) {
    try {
      const res = await instance.get(`/movie/${id}/credits`, {
        params: {
          api_key: this.api_key,
          language: this.language
        }
      })
      return res.data
    } catch (error) {
      throw error
    }
  }

  async getRecommendationsByMovieId(id) {
    try {
      const res = await instance.get(`/movie/${id}/recommendations`, {
        params: {
          api_key: this.api_key,
          language: this.language
        }
      })
      return res.data
    } catch (error) {
      throw error
    }
  }

  async getSimilarByMovieId(id) {
    try {
      const res = await instance.get(`/movie/${id}/similar`, {
        params: {
          api_key: this.api_key,
          language: this.language
        }
      })
      return res.data
    } catch (error) {
      throw error
    }
  }

  async getAccount(session_id) {
    try {
      if (!session_id) throw new Error('session not found')
      const res = await instance.get('/account', {
        params: {
          api_key: this.api_key,
          session_id
        }
      })
      return res.data
    } catch (error) {
      throw error
    }
  }

  async getAccountMovies(user_id, session_id, category, page) {
    try {
      if (!session_id) throw new Error('session not found')
      const res = await instance.get(`/account/${user_id}/${category}/movies`, {
        params: {
          api_key: this.api_key,
          session_id,
          language: this.language,
          page
        }
      })

      return res.data
    } catch (error) {
      throw error
    }
  }

  async getNewAuthToken() {
    try {
      const res = await instance.get('/authentication/token/new', {
        params: {
          api_key: this.api_key
        }
      })

      return res.data
    } catch (error) {
      throw error
    }
  }

  async getNewAuthSession(request_token) {
    try {
      if (!request_token) throw new Error('token not found')
      const res = await instance.get('/authentication/session/new', {
        params: {
          api_key: this.api_key,
          request_token
        }
      })

      return res.data
    } catch (error) {
      throw error
    }
  }

  async searchMovie(query, page) {
    try {
      if (!query || query.length === 0) return []
      const res = await instance.get('/search/movie', {
        params: {
          api_key: this.api_key,
          language: this.language,
          query,
          page
        }
      })
      return res.data
    } catch (error) {
      throw error
    }
  }

  async setFavorite(session_id, user_id, movie_id, value) {
    try {
      if (!session_id) throw new Error('session not found')
      const res = await instance.post(
        `/account/${user_id}/favorite`,
        {
          media_type: 'movie',
          media_id: movie_id,
          favorite: value
        },
        {
          params: {
            api_key: this.api_key,
            session_id: session_id
          }
        }
      )

      return res.data
    } catch (error) {
      throw error
    }
  }

  async setWatchlist(session_id, user_id, movie_id, value) {
    try {
      if (!session_id) throw new Error('session not found')
      const res = await instance.post(
        `/account/${user_id}/watchlist`,
        {
          media_type: 'movie',
          media_id: movie_id,
          watchlist: value
        },
        {
          params: {
            api_key: this.api_key,
            session_id: session_id
          }
        }
      )

      return res.data
    } catch (error) {
      throw error
    }
  }

  async setRating(session_id, movie_id, value) {
    try {
      if (!session_id) throw new Error('session not found')
      const res = await instance.post(
        `/movie/${movie_id}/rating`,
        {
          value
        },
        {
          params: {
            api_key: this.api_key,
            language: this.language,
            session_id: session_id
          }
        }
      )

      return res.data
    } catch (error) {
      throw error
    }
  }
}

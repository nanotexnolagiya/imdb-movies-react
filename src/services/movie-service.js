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

  async getAccount(session_id) {
    try {
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
}

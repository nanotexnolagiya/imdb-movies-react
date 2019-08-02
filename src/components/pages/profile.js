import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import instance from '../../instance'
import {
  userSessionRequest,
  userSessionSuccess,
  userSessionError,
  setUserLoggedIn,
  userRequested,
  userSuccess,
  userError
} from '../../actions'
import Loader from '../loader'

const queryStringParse = str => {
  const params = {}
  str
    .substr(1)
    .split('&')
    .forEach(param => {
      param = param.split('=')
      params[param[0]] = param[1]
    })
  return params
}

class Profile extends Component {
  checkSession = async request_token => {
    const { api_key, userSessionError, userSessionSuccess } = this.props
    try {
      const res = await instance.get('/authentication/session/new', {
        params: {
          api_key,
          request_token
        }
      })

      const { session_id } = res.data

      localStorage.setItem('session_id', session_id)
      userSessionSuccess(session_id)
    } catch (error) {
      userSessionError(error)
    }
  }

  getUser = async () => {
    const {
      api_key,
      session_id,
      userRequested,
      userSuccess,
      userError
    } = this.props
    userRequested()
    try {
      const res = await instance.get('/account', {
        params: {
          api_key,
          session_id
        }
      })
      userSuccess(res.data)
    } catch (error) {
      userError(error)
    }
  }

  componentDidMount() {
    const {
      location,
      history,
      userSessionRequest,
      setUserLoggedIn
    } = this.props
    const params = queryStringParse(location.search)
    if (Object.keys(params).includes('approved')) {
      userSessionRequest()
      this.checkSession(params.request_token)
      this.getUser()
      setUserLoggedIn(true)
    } else if (Object.keys(params).includes('denied')) {
      setUserLoggedIn(false)
    } else if (this.session_id) {
      setUserLoggedIn(true)
    } else {
      history.push('/')
    }
  }

  render() {
    const { user, loading } = this.props
    return (
      <div>
        {loading && <Loader />}
        {user && <div className="profile">Hello {user.username}</div>}
      </div>
    )
  }
}

const mapStateToProps = ({
  auth: { api_key, userLoggedIn, session_id },
  user: { user, loading }
}) => ({
  api_key,
  loading,
  userLoggedIn,
  session_id,
  user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userSessionError,
      userSessionRequest,
      userSessionSuccess,
      setUserLoggedIn,
      userError,
      userSuccess,
      userRequested
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

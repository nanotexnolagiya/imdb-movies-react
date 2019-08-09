import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { withMovieService } from '../hoc'
import queryStringParse from '../../utils/queryStringParse'
import {
  userSessionRequest,
  userSessionSuccess,
  userSessionError,
  setUserLoggedIn,
  userRequested,
  userSuccess,
  userError
} from '../../actions/user'
import Loader from '../loader'

class Profile extends Component {
  checkSession = async request_token => {
    const { userSessionError, userSessionSuccess, movieService } = this.props
    try {
      const { session_id } = await movieService.getNewAuthSession(request_token)

      localStorage.setItem('session_id', session_id)
      userSessionSuccess(session_id)
      return session_id
    } catch (error) {
      userSessionError(error)
    }
  }

  getUser = async session_id => {
    const { userRequested, userSuccess, userError, movieService } = this.props
    userRequested()
    try {
      const data = await movieService.getAccount(session_id)
      userSuccess(data)
    } catch (error) {
      userError(error)
    }
  }

  componentDidMount() {
    const {
      location,
      history,
      userSessionRequest,
      setUserLoggedIn,
      session_id
    } = this.props
    const params = queryStringParse(location.search)
    if (Object.keys(params).includes('approved')) {
      userSessionRequest()
      const $this = this
      this.checkSession(params.request_token).then(session_id =>
        $this.getUser(session_id)
      )
      setUserLoggedIn(true)
    } else if (Object.keys(params).includes('denied')) {
      setUserLoggedIn(false)
      history.push('/')
    } else if (session_id) {
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
  auth: { userLoggedIn, session_id },
  user: { user, loading }
}) => ({
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

export default compose(
  withMovieService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Profile)

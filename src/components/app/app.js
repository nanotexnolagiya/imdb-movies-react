import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import Navigation from '../navigation'
import Router from '../../router'
import { withMovieService } from '../hoc'
import {
  userRequested,
  userError,
  userSuccess,
  setUserLoggedIn
} from '../../actions/user'

import './app.css'

class App extends Component {
  getUser = async () => {
    const {
      session_id,
      userRequested,
      userSuccess,
      userError,
      setUserLoggedIn,
      movieService
    } = this.props
    userRequested()
    try {
      const data = await movieService.getAccount(session_id)
      userSuccess(data)
      setUserLoggedIn(true)
    } catch (error) {
      userError(error)
    }
  }
  componentDidMount() {
    this.getUser()
  }

  render() {
    return (
      <div id="app">
        <Navigation />
        <Router />
      </div>
    )
  }
}

const mapStateToProps = ({ auth: { session_id }, user: { loading } }) => ({
  loading,
  session_id
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userError,
      userSuccess,
      userRequested,
      setUserLoggedIn
    },
    dispatch
  )

export default compose(
  withMovieService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App)

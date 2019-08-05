import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navigation from '../navigation'
import Router from '../../router'
import MovieServices from '../../services/movie-service'
import {
  userRequested,
  userError,
  userSuccess,
  setUserLoggedIn
} from '../../actions'

import './app.css'

class App extends Component {
  movieService = new MovieServices()
  getUser = async () => {
    const {
      session_id,
      userRequested,
      userSuccess,
      userError,
      setUserLoggedIn
    } = this.props
    userRequested()
    try {
      const data = await this.movieService.getAccount(session_id)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

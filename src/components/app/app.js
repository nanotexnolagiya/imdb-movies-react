import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navigation from '../navigation'
import Router from '../../router'
import instance from '../../instance'
import {
  userRequested,
  userError,
  userSuccess,
  setUserLoggedIn
} from '../../actions'

import './app.css'

class App extends Component {
  getUser = async () => {
    const {
      api_key,
      session_id,
      userRequested,
      userSuccess,
      userError,
      setUserLoggedIn
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

const mapStateToProps = ({
  auth: { api_key, session_id },
  user: { loading }
}) => ({
  api_key,
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

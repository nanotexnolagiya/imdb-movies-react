import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app'
import store from './store'
import MovieService from './services/movie-service'
import ErrorBoundary from './components/error-boundary'
import { MovieServiceProvider } from './components/movie-service-context'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'

const element = document.getElementById('root')
const movieService = new MovieService()

render(
  <Provider store={store}>
    <ErrorBoundary>
      <MovieServiceProvider value={movieService}>
        <Router>
          <App />
        </Router>
      </MovieServiceProvider>
    </ErrorBoundary>
  </Provider>,
  element
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

import React, { Component } from 'react'
import MovieItem from '../movie-item'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { withMovieService } from '../hoc'
import {
  moviesRequested,
  movieByIdLoaded,
  moviesError
} from '../../actions/movie'

class Movie extends Component {
  state = {
    id: null
  }

  fetchMovieById = async id => {
    const {
      session_id,
      movieByIdLoaded,
      moviesRequested,
      moviesError,
      movieService
    } = this.props
    moviesRequested()
    try {
      const movie = await movieService.getMovieById(id)
      const account_states = await movieService.getAccountStatesByMovieId(
        id,
        session_id
      )
      const credits = await movieService.getCreditsByMovieId(id)
      const recommendations = await movieService.getRecommendationsByMovieId(id)
      const similar = await movieService.getSimilarByMovieId(id)
      movie.account_states = account_states

      movie.credits = {
        cast: credits.cast.splice(0, 20),
        crew: credits.crew.splice(0, 20)
      }
      movie.recommendations = recommendations.results.splice(0, 5)
      movie.similar = similar.results.splice(0, 5)
      movieByIdLoaded(movie)
    } catch (error) {
      moviesError(error)
    }
  }

  setFavorite = async () => {
    const { session_id, user, movie, movieService } = this.props
    try {
      const data = await movieService.setFavorite(
        session_id,
        user.id,
        movie.id,
        !movie.account_states.favorite
      )
      if (data) {
        this.fetchMovieById(movie.id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  setWatchlist = async () => {
    const { session_id, user, movie, movieService } = this.props
    try {
      const data = await movieService.setWatchlist(
        session_id,
        user.id,
        movie.id,
        !movie.account_states.watchlist
      )
      if (data) {
        this.fetchMovieById(movie.id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.setState({
      id
    })
    this.fetchMovieById(id)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, this.props)
    if (nextProps.match.params.id !== nextState.id) {
      const { id } = nextProps.match.params
      this.setState({
        id
      })
      this.fetchMovieById(id)
    }
    return true
  }

  render() {
    if (this.props.movie) {
      return (
        <MovieItem
          movie={this.props.movie}
          loading={this.props.loading}
          favorite={this.setFavorite}
          watchlist={this.setWatchlist}
        />
      )
    }
    return <div>Error</div>
  }
}

const mapStateToProps = ({
  movies: { movie, loading },
  auth: { session_id },
  user: { user }
}) => ({
  movie,
  session_id,
  loading,
  user
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      movieByIdLoaded,
      moviesRequested,
      moviesError
    },
    dispatch
  )

export default compose(
  withMovieService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Movie)

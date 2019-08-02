import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import instance from '../../instance'
import MovieList from '../movie-list'
import {
  moviesRequested,
  moviesError,
  moviesComplate,
  moviesByCategory
} from '../../actions'
import Loader from '../loader'

class Home extends Component {
  fetchMovie = async (category, limit) => {
    const { api_key, moviesError, moviesByCategory } = this.props
    try {
      const res = await instance.get(`/movie/${category}`, {
        params: {
          api_key: api_key,
          language: 'en-US'
        }
      })
      moviesByCategory({ category, results: res.data.results.splice(0, limit) })
    } catch (error) {
      console.log(error)
      moviesError(error)
    }
  }

  componentDidMount() {
    const { moviesRequested, moviesComplate } = this.props
    moviesRequested()
    this.fetchMovie('popular', 10)
    this.fetchMovie('top_rated', 10)
    this.fetchMovie('upcoming', 10)
    this.fetchMovie('now_playing', 10)
    moviesComplate()
  }

  render() {
    const { popular, top_rated, upcoming, now_playing, loading } = this.props
    return (
      <Container fluid>
        {loading && <Loader />}
        <section>
          <h2 className="section-title">Popular</h2>
          <MovieList sm="6" md="2-5" movies={popular} />
        </section>
        <section>
          <h2 className="section-title">Top Rated</h2>
          <MovieList sm="6" md="2-5" movies={top_rated} />
        </section>
        <section>
          <h2 className="section-title">Upcoming</h2>
          <MovieList sm="6" md="2-5" movies={upcoming} />
        </section>
        <section>
          <h2 className="section-title">Now Playing</h2>
          <MovieList sm="6" md="2-5" movies={now_playing} />
        </section>
      </Container>
    )
  }
}

const mapStateToProps = ({
  movies: { popular, top_rated, upcoming, now_playing, loading },
  auth: { api_key }
}) => {
  return { popular, top_rated, upcoming, now_playing, api_key, loading }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      moviesError,
      moviesRequested,
      moviesComplate,
      moviesByCategory
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

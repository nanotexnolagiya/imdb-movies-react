import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import MovieListItem from '../movie-list-item'
import {
  moviesRequested,
  moviesError,
  moviesComplate,
  moviesByCategory
} from '../../actions/movie'
import Loader from '../loader'
import { withMovieService } from '../hoc'

class Home extends Component {
  fetchMovie = async (category, limit) => {
    const { moviesError, moviesByCategory, movieService } = this.props
    try {
      const data = await movieService.getMovieByCategory(category)
      moviesByCategory({ category, results: data.results.splice(0, limit) })
    } catch (error) {
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
          <Row className="movies">
            {popular.map(popular_item => (
              <MovieListItem
                movie={popular_item}
                key={popular_item.id}
                sm="6"
                md="2-5"
              />
            ))}
          </Row>
        </section>
        <section>
          <h2 className="section-title">Top Rated</h2>
          <Row className="movies">
            {top_rated.map(top_rated_item => (
              <MovieListItem
                movie={top_rated_item}
                key={top_rated_item.id}
                sm="6"
                md="2-5"
              />
            ))}
          </Row>
        </section>
        <section>
          <h2 className="section-title">Upcoming</h2>
          <Row className="movies">
            {upcoming.map(upcoming_item => (
              <MovieListItem
                movie={upcoming_item}
                key={upcoming_item.id}
                sm="6"
                md="2-5"
              />
            ))}
          </Row>
        </section>
        <section>
          <h2 className="section-title">Now Playing</h2>
          <Row className="movies">
            {now_playing.map(now_playing_item => (
              <MovieListItem
                movie={now_playing_item}
                key={now_playing_item.id}
                sm="6"
                md="2-5"
              />
            ))}
          </Row>
        </section>
      </Container>
    )
  }
}

const mapStateToProps = ({
  movies: { popular, top_rated, upcoming, now_playing, loading }
}) => {
  return { popular, top_rated, upcoming, now_playing, loading }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      moviesError,
      moviesRequested,
      moviesComplate,
      moviesByCategory
    },
    dispatch
  )

export default compose(
  withMovieService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home)

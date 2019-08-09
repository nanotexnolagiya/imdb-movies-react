import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import MovieListItem from '../movie-list-item'
import { withMovieService } from '../hoc'
import {
  moviesRequested,
  moviesError,
  moviesLoaded,
  moviesByCategoryMore
} from '../../actions/movie'
import Loader from '../loader'

class Search extends Component {
  state = {
    search: null,
    page: 1
  }

  fetchMovies = async (query, page, more = false) => {
    const {
      moviesRequested,
      moviesError,
      moviesByCategoryMore,
      moviesLoaded,
      movieServices
    } = this.props
    try {
      moviesRequested()
      const data = await movieServices.searchMovie(query, page)
      if (more) {
        moviesByCategoryMore(data)
      } else {
        moviesLoaded(data)
      }
    } catch (error) {
      moviesError(error)
    }
  }

  fetchSearchMore = () => {
    const { search, page } = this.state
    const newPage = page + 1
    this.setState({
      page: newPage
    })
    this.fetchMovies(search, newPage)
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps
    const newSearch = match.params.search
    const { search } = this.state
    if (newSearch !== search) {
      this.setState({
        category: newSearch
      })
      document.title = `Search by: ${newSearch}`
      this.setState({
        page: 1
      })
      this.fetchMovies(newSearch)
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { search } = match.params
    const { page } = this.state
    document.title = `Search by: ${search}`
    this.setState({
      search
    })
    this.fetchMovies(search, page)
  }

  render() {
    const { movies, pages, loading } = this.props
    const { page } = this.state
    return (
      <Container fluid>
        <section>
          {loading && <Loader />}
          <Row className="movies">
            {movies.map(movie => (
              <MovieListItem movie={movie} key={movie.id} sm="6" md="2-5" />
            ))}
          </Row>
          {pages >= page && (
            <Row className="text-center">
              <Col sm="12">
                <Button variant="outline-danger" onClick={this.fetchSearchMore}>
                  More
                </Button>
              </Col>
            </Row>
          )}
        </section>
      </Container>
    )
  }
}

const mapStateToProps = ({ movies: { movies, pages, loading } }) => ({
  movies,
  pages,
  loading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      moviesError,
      moviesRequested,
      moviesLoaded,
      moviesByCategoryMore
    },
    dispatch
  )

export default compose(
  withMovieService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search)

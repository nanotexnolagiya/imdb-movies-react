import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MovieListItem from '../movie-list-item'
import MovieServices from '../../services/movie-service'
import {
  moviesRequested,
  moviesLoaded,
  moviesError,
  moviesByCategoryMore
} from '../../actions'
import Loader from '../loader'

class Category extends Component {
  state = {
    page: 1,
    category: ''
  }

  movieService = new MovieServices()

  fetchByCategory = async category => {
    const { moviesRequested, moviesLoaded, moviesError } = this.props
    const { page } = this.state
    try {
      moviesRequested()
      const data = await this.movieService.getMovieByCategory(category, page)
      moviesLoaded(data)
    } catch (error) {
      moviesError(error)
    }
  }

  fetchByCategoryMore = async () => {
    const { moviesRequested, moviesByCategoryMore, moviesError } = this.props
    const { page, category } = this.state
    const newPage = page + 1
    try {
      moviesRequested()
      const data = await this.movieService.getMovieByCategory(category, newPage)
      moviesByCategoryMore(data)
      this.setState({
        page: newPage
      })
    } catch (error) {
      moviesError(error)
    }
  }

  componentDidMount() {
    const { history, match } = this.props
    const category = match.params.category
    this.setState({
      category
    })
    if (
      !['popular', 'top_rated', 'upcoming', 'now_playing'].includes(category)
    ) {
      history.push('/404')
    }
    document.title = `${category.charAt(0).toUpperCase() +
      // eslint-disable-next-line no-useless-escape
      category.slice(1).replace(/\_/, ' ')} Movies -- IMDb`
    this.fetchByCategory(category)
  }

  componentWillReceiveProps(nextProps) {
    const { history, match } = nextProps
    const { category } = this.state
    if (match.params.category !== category) {
      this.setState({
        category: match.params.category
      })
      if (
        !['popular', 'top_rated', 'upcoming', 'now_playing'].includes(
          match.params.category
        )
      ) {
        history.push('/404')
      }
      document.title = `${match.params.category.charAt(0).toUpperCase() +
        // eslint-disable-next-line no-useless-escape
        match.params.category.slice(1).replace(/\_/, ' ')} Movies -- IMDb`
      this.fetchByCategory(match.params.category)
    }
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
                <Button
                  outline
                  color="danger"
                  onClick={this.fetchByCategoryMore}
                >
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
      moviesLoaded,
      moviesError,
      moviesRequested,
      moviesByCategoryMore
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

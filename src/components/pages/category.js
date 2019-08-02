import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import instance from '../../instance'
import MovieList from '../movie-list'
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

  fetchByCategory = async category => {
    const { api_key, moviesRequested, moviesLoaded, moviesError } = this.props
    const { page } = this.state
    try {
      moviesRequested()
      const res = await instance.get(`/movie/${category}`, {
        params: {
          api_key: api_key,
          language: 'en-US',
          page
        }
      })
      moviesLoaded(res.data)
    } catch (error) {
      moviesError(error)
    }
  }

  fetchByCategoryMore = async () => {
    const {
      api_key,
      moviesRequested,
      moviesByCategoryMore,
      moviesError
    } = this.props
    const { page, category } = this.state
    const newPage = page + 1
    try {
      moviesRequested()
      const res = await instance.get(`/movie/${category}`, {
        params: {
          api_key: api_key,
          language: 'en-US',
          page: newPage
        }
      })
      moviesByCategoryMore(res.data)
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
          <MovieList sm="6" md="2-5" movies={movies} />
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

const mapStateToProps = ({
  auth: { api_key },
  movies: { movies, pages, loading }
}) => ({ api_key, movies, pages, loading })

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

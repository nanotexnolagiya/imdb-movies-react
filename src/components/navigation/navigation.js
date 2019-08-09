import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { withMovieService } from '../hoc'
import { Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap'
import debounce from '../../utils/debounce'
import { moviesRequested, moviesError, moviesSearch } from '../../actions/movie'
import { setUserLoggedIn } from '../../actions/user'
import './navigation.css'

class Navigation extends Component {
  state = {
    showSearchWrap: false,
    menus: [
      { url: '/', name: 'Home' },
      { url: '/category/popular', name: 'Popular' },
      { url: '/category/top_rated', name: 'Top Rated' },
      { url: '/category/upcoming', name: 'Upcoming' },
      { url: '/category/now_playing', name: 'Now playing' }
    ],
    user_menus: [
      { url: '/profile', name: 'Profile' },
      { url: '/account/favorite', name: 'Favorite' },
      { url: '/account/watchlist', name: 'Watchlist' }
    ],
    languages: ['uz', 'ru', 'en']
  }

  searchReset = () => {
    const { moviesSearch } = this.props
    this.setState({
      showSearchWrap: false
    })
    document.getElementById('nav_search_input').value = ''
    moviesSearch([])
  }

  closeSearch = () => {
    this.setState({
      showSearchWrap: false
    })
  }

  submitSearch = e => {
    e.preventDefault()
    const searchText = document.getElementById('nav_search_input').value
    const { history } = this.props
    this.searchReset()
    history.push(`/search/${searchText}`)
  }

  handleSearch = debounce(async () => {
    const {
      moviesRequested,
      moviesError,
      moviesSearch,
      movieService
    } = this.props
    try {
      moviesRequested()
      const searchText = document.getElementById('nav_search_input').value
      const data = await movieService.searchMovie(searchText)
      moviesSearch(data.results)
      this.setState({
        showSearchWrap: true
      })
    } catch (error) {
      moviesError(error)
    }
  }, 1000)

  login = async () => {
    try {
      const data = await this.props.movieService.getNewAuthToken()
      if (data.success) {
        window.location.href = `https://www.themoviedb.org/authenticate/${
          data.request_token
          // eslint-disable-next-line no-restricted-globals
        }?redirect_to=${location.protocol}//${location.host}/profile`
      }
    } catch (error) {}
  }

  logout = () => {
    localStorage.clear()
    const { setUserLoggedIn, history } = this.props
    setUserLoggedIn(false)
    history.push('/')
  }

  render() {
    const { menus, user_menus, languages, showSearchWrap } = this.state
    const { userLoggedIn, user, searchMovies } = this.props
    return (
      <Fragment>
        <div className="navigation">
          <Navbar sticky="top" bg="dark" expand="md">
            <Navbar.Brand>
              <Link to="/">Movies</Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="nav-collapse">
              <Nav>
                {menus.map(menu => {
                  return (
                    <Nav.Item key={menu.url}>
                      <Link className="nav-link" to={menu.url}>
                        {menu.name}
                      </Link>
                    </Nav.Item>
                  )
                })}
              </Nav>
              <Nav className="ml-auto" navbar>
                <Form
                  className="search-wrap"
                  inline
                  onSubmit={this.submitSearch}
                >
                  <FormControl
                    type="text"
                    size="sm"
                    className="mr-sm-2 search-input"
                    id="nav_search_input"
                    placeholder="Search"
                    onKeyPress={debounce(this.handleSearch, 1500)}
                    autoComplete="off"
                  />
                  {showSearchWrap && searchMovies ? (
                    <div className="search-results">
                      {searchMovies.map(movie => (
                        <div key={movie.id} className="search-results-item">
                          <h4 className="search-results-title">
                            {movie.title}
                          </h4>
                          <div className="search-results-metas">
                            <span className="fa fa-star">
                              {movie.vote_average}
                            </span>
                          </div>
                          <Link
                            to={`/movie/${movie.id}`}
                            className="search-results-link"
                            onClick={this.searchReset}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </Form>
                <NavDropdown title={<span className="fa fa-globe" />}>
                  {languages.map((language, idx) => {
                    return (
                      <NavDropdown.Item href="#" key={idx}>
                        {language}
                      </NavDropdown.Item>
                    )
                  })}
                </NavDropdown>
                {!userLoggedIn && (
                  <Nav.Item>
                    <Nav.Link href="#" onClick={this.login}>
                      Login
                    </Nav.Link>
                  </Nav.Item>
                )}
                {userLoggedIn && (
                  <NavDropdown title={user ? user.username : ''}>
                    {user_menus.map((user_menu, idx) => {
                      return (
                        <Link
                          className="dropdown-item"
                          key={user_menu.url}
                          to={user_menu.url}
                        >
                          {user_menu.name}
                        </Link>
                      )
                    })}
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        {showSearchWrap && (
          <div className="search-backdrop" onClick={this.closeSearch} />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({
  auth: { userLoggedIn },
  user: { user },
  movies: { searchMovies }
}) => {
  return { userLoggedIn, user, searchMovies }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      moviesError,
      moviesRequested,
      moviesSearch,
      setUserLoggedIn
    },
    dispatch
  )

export default compose(
  withMovieService(),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Navigation)

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import instance from '../../instance'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Form,
  Input
} from 'reactstrap'
import './navigation.css'

function debounce(f, ms) {
  let timer = null

  return function(...args) {
    const onComplete = () => {
      f.apply(this, args)
      timer = null
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(onComplete, ms)
  }
}

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

  handleSearch = e => {
    console.log(e.target)
  }

  login = async () => {
    const { api_key } = this.props
    try {
      const res = await instance.get('/authentication/token/new', {
        params: { api_key }
      })
      const data = res.data
      if (data.success) {
        window.location.href = `https://www.themoviedb.org/authenticate/${
          data.request_token
          // eslint-disable-next-line no-restricted-globals
        }?redirect_to=${location.protocol}//${location.host}/profile`
      }
    } catch (error) {}
  }

  render() {
    const { menus, user_menus, languages, showSearchWrap } = this.state
    const { userLoggedIn, user } = this.props
    console.log(user)
    return (
      <Fragment>
        <div className="navigation">
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Movies</NavbarBrand>

            <NavbarToggler target="nav-collapse" />

            <Collapse id="nav-collapse" navbar>
              <Nav navbar>
                {menus.map(menu => {
                  return (
                    <NavItem key={menu.url}>
                      <Link className="nav-link" to={menu.url}>
                        {menu.name}
                      </Link>
                    </NavItem>
                  )
                })}
              </Nav>
              <Nav className="ml-auto" navbar>
                <Form className="search-wrap form-inline">
                  <Input
                    bsSize="sm"
                    className="mr-sm-2 search-input"
                    placeholder="Search"
                    onKeyPress={debounce(this.handleSearch, 1000)}
                  />
                  {showSearchWrap && (
                    <div className="search-results">
                      <div
                        className="search-results-item"
                        v-for="item in searchMovies"
                      >
                        <h4 className="search-results-title">Movie</h4>
                        <div className="search-results-metas">
                          <span className="fa fa-star">5</span>
                        </div>
                        <Link href="#" className="search-results-link" />
                      </div>
                    </div>
                  )}
                </Form>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span className="fa fa-globe" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    {languages.map((language, idx) => {
                      return (
                        <DropdownItem href="#" key={idx}>
                          {language}
                        </DropdownItem>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                {!userLoggedIn && (
                  <NavItem>
                    <NavLink href="#" onClick={this.login}>
                      Login
                    </NavLink>
                  </NavItem>
                )}
                {userLoggedIn && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {user ? user.username : ''}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {user_menus.map(user_menu => {
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
                      <DropdownItem divider />
                      <DropdownItem>Logout</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div className="search-backdrop" />
      </Fragment>
    )
  }
}

const mapStateToProps = ({
  auth: { userLoggedIn, api_key },
  user: { user }
}) => {
  return { userLoggedIn, api_key, user }
}

export default connect(mapStateToProps)(Navigation)

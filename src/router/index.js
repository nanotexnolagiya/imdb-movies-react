import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  Home,
  AccountMovie,
  Category,
  Movie,
  NotFound,
  Profile,
  Search
} from '../components/pages'

export default () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/profile" component={Profile} />
      <Route path="/category/:category" component={Category} />
      <Route path="/account/:category" component={AccountMovie} />
      <Route path="/movie/:id" component={Movie} />
      <Route path="/search/:search" component={Search} />
      <Route component={NotFound} />
    </Switch>
  )
}

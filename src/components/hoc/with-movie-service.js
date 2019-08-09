import React from 'react'
import { MovieServiceConsumer } from '../movie-service-context'

export default () => Wrapped => {
  return props => {
    return (
      <MovieServiceConsumer>
        {movieService => {
          return <Wrapped {...props} movieService={movieService} />
        }}
      </MovieServiceConsumer>
    )
  }
}

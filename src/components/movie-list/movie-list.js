import React from 'react'
import MovieListItem from './movie-list-item'
import { Row, Col } from 'reactstrap'
import './movie-list.css'

export default ({ movies, sm, md, lg }) => {
  if (movies.length !== 0) {
    return (
      <Row className="movies">
        {movies.map(movie => {
          return (
            <Col sm={sm} md={md} lg={lg} key={movie.id}>
              <MovieListItem movie={movie} />
            </Col>
          )
        })}
      </Row>
    )
  } else {
    return <p>Movies not found</p>
  }
}

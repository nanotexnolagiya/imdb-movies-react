import React from 'react'
import { Card, Tooltip, Col, OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './movie-list-item.css'

export default ({ movie, sm, md, lg, className }) => {
  if (movie.constructor === Object && Object.keys(movie) !== 0) {
    return (
      <Col sm={sm} md={md} lg={lg} className={className}>
        <Card>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${
              movie.poster_path
            }`}
            alt={movie.title}
          />
          <Card.Body>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{movie.overview}</Tooltip>}
            >
              <Link
                className="text-danger card-title"
                id={`tooltip-${movie.id}`}
                to={`/movie/${movie.id}`}
              >{`${movie.title} (${movie.release_date.split('-')[0]})`}</Link>
            </OverlayTrigger>

            <Tooltip placement="top" target={`tooltip-${movie.id}`}>
              {movie.overview}
            </Tooltip>
            <div className="metas">
              <span className="fa fa-star text-warning">
                {movie.vote_average}
              </span>
              <span>votes: {movie.vote_count}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

import React from 'react'
import { Card, CardImg, CardBody, Tooltip } from 'reactstrap'
import { Link } from 'react-router-dom'

export default ({ movie }) => {
  if (movie.constructor === Object && Object.keys(movie) !== 0) {
    return (
      <Card>
        <CardImg
          top
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${
            movie.poster_path
          }`}
          alt={movie.title}
        />
        <CardBody>
          <Link
            className="text-danger card-title"
            id={`tooltip-${movie.id}`}
            to={`/movie/${movie.id}`}
          >{`${movie.title} (${movie.release_date.split('-')[0]})`}</Link>
          <Tooltip placement="top" target={`tooltip-${movie.id}`}>
            {movie.overview}
          </Tooltip>
          <div className="metas">
            <span className="fa fa-star text-warning">
              {movie.vote_average}
            </span>
            <span>votes: {movie.vote_count}</span>
          </div>
        </CardBody>
      </Card>
    )
  }
}

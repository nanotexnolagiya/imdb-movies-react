import React, { Fragment, useEffect } from 'react'
import { Button, Row } from 'react-bootstrap'
import MovieListItem from '../movie-list-item'
import Loader from '../loader'
import './movie-item.css'

export default ({ movie, loading, favorite, watchlist }) => {
  useEffect(() => {
    document.querySelectorAll('a').forEach(elem => {
      elem.classList.remove('btn')
      elem.classList.remove('btn-secondary')
    })
  })

  return (
    <div className="movie">
      {loading && <Loader />}
      <div className="movie-container">
        <div
          className="movie-bg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
              movie.backdrop_path
            })`
          }}
        >
          <div className="movie-wrap">
            <figure className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt="movie.title"
              />
            </figure>
            <div className="movie-title">
              <h1 className="text-danger">{movie.title}</h1>
            </div>
          </div>
        </div>
        <div className="movie-content">
          <div className="movie-main">
            <div className="movie-actions">
              {movie.account_states && (
                <Fragment>
                  <Button
                    href="#"
                    onClick={favorite}
                    variant="secondary"
                    className={
                      movie.account_states.favorite
                        ? 'fa text-dark fa-heart active'
                        : 'fa text-dark fa-heart-o'
                    }
                  >
                    {movie.account_states.favorite
                      ? 'Marked as Favorite!'
                      : 'Mark as Favorite?'}
                  </Button>
                  <Button
                    href="#"
                    onClick={watchlist}
                    variant="secondary"
                    className={`fa fa-television text-dark ${
                      movie.account_states.watchlist ? 'active' : ''
                    }`}
                  >
                    {movie.account_states.watchlist
                      ? 'Marked as Watchlist!'
                      : 'Mark as Watchlist?'}
                  </Button>
                </Fragment>
              )}
            </div>
            <div className="movie-info">
              <div className="movie-description">
                <p>{movie.overview}</p>
                <Button
                  variant="secondary"
                  href={movie.homepage}
                  className="text-danger"
                >
                  Website
                </Button>
              </div>
              <div className="movie-details">
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Genres:</h2>
                  <div className="movie-details-text">
                    {movie.genres.map(genre => genre.name).join(', ')}
                  </div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Cast:</h2>
                  <div className="movie-details-text">
                    {movie.credits.cast.map(cast => cast.name).join(', ')}
                  </div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Crew:</h2>
                  <div className="movie-details-text">
                    {movie.credits.crew.map(crew => crew.name).join(', ')}
                  </div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Production Companies:</h2>
                  <div className="movie-details-text">
                    {movie.production_companies
                      .map(company => company.name)
                      .join(', ')}
                  </div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Production Countries:</h2>
                  <div className="movie-details-text">
                    {movie.production_countries
                      .map(country => country.name)
                      .join(', ')}
                  </div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Release Date:</h2>
                  <div className="movie-details-text">{movie.release_date}</div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Budget:</h2>
                  <div className="movie-details-text">{movie.budget}</div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Revenue:</h2>
                  <div className="movie-details-text">{movie.revenue}</div>
                </div>
                {movie.belongs_to_collection && (
                  <div className="movie-details-block">
                    <h2 className="movie-details-title">Collection:</h2>
                    <div className="movie-details-text">
                      {movie.belongs_to_collection.name}
                    </div>
                  </div>
                )}

                <div className="movie-details-block">
                  <h2 className="movie-details-title">Runtime:</h2>
                  <div className="movie-details-text">
                    {movie.runtime + ' min'}
                  </div>
                </div>
                <div className="movie-details-block">
                  <h2 className="movie-details-title">Status:</h2>
                  <div className="movie-details-text">{movie.status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <h2 className="section-title">Similar</h2>
          <Row className="movies">
            {movie.similar.map(similar => (
              <MovieListItem sm="6" md="2-5" movie={similar} key={similar.id} />
            ))}
          </Row>
        </section>
        <section>
          <h2 className="section-title">Recommendations</h2>
          <Row className="movies">
            {movie.recommendations.map(recommendation => (
              <MovieListItem
                sm="6"
                md="2-5"
                movie={recommendation}
                key={recommendation.id}
              />
            ))}
          </Row>
        </section>
      </div>
    </div>
  )
}

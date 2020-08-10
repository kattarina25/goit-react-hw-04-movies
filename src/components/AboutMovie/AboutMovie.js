import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Api from '../../services/moviesApi';
import routes from '../../routes';
import Container from '../Container';
import styles from './AboutMovie.module.css';
import defaultImage from './defaultImg.jpg';

const basePath = 'https://image.tmdb.org/t/p/original';

class AboutMovie extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string.isRequired,
      }).isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.objectOf.isRequired,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    title: null,
    releaseDate: null,
    posterPath: null,
    voteAverage: null,
    overview: null,
    genres: null,
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const { movieId } = this.props.match.params;
    const movie = await Api.fetchFullInfo(movieId);
    this.setState({
      title: movie.original_title,
      releaseDate: movie.release_date.substring(0, 4),
      posterPath: movie.poster_path
        ? basePath + movie.poster_path
        : defaultImage,
      voteAverage: movie.vote_average,
      overview: movie.overview,
      genres: this.refactorGenres(movie.genres).join(' '),
    });
  }

  refactorGenres = genres => {
    return genres.map(genre => genre.name);
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || routes.home);
  };

  render() {
    const {
      title,
      releaseDate,
      posterPath,
      voteAverage,
      overview,
      genres,
    } = this.state;

    return (
      <section className={styles.AboutMovie}>
        <Container>
          <button
            type="button"
            className={styles.GoBack}
            onClick={this.handleGoBack}
          >
            Go Back
          </button>
          <div className={styles.AboutMovieBox}>
            <div className={styles.Image}>
              <img src={posterPath} alt={title} />
            </div>
            <div className={styles.Description}>
              <h1>{`${title} ${releaseDate}`}</h1>
              <p>User Scope {voteAverage}</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>{genres}</p>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

export default withRouter(AboutMovie);

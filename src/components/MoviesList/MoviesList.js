import React from 'react';
import PropTypes from 'prop-types';
import routes from '../../routes';
import styles from './MoviesList.module.css';
import Container from '../Container';
import MoviesItem from '../MoviesItem';
import defaultImage from './defaultImg.jpg';

const basePath = 'https://image.tmdb.org/t/p/original';

const MoviesList = ({ movies }) => (
  <Container>
    <ul className={styles.List}>
      {movies.map(({ id, title, backdrop_path }) => (
        <li className={styles.Item} key={id}>
          <MoviesItem
            routes={`${routes.movies}/${id}`}
            backdropPath={
              backdrop_path ? basePath + backdrop_path : defaultImage
            }
            title={title}
          />
        </li>
      ))}
    </ul>
  </Container>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MoviesList;

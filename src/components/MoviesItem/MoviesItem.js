import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styles from './MoviesItem.module.css';

const MoviesItem = ({ routes, backdropPath, title, location }) => {
  return (
    <Link
      to={{
        pathname: routes,
        state: { from: location },
      }}
    >
      <img src={backdropPath} alt={title} />
      <p className={styles.Title}>{title}</p>
    </Link>
  );
};

MoviesItem.propTypes = {
  routes: PropTypes.string.isRequired,
  backdropPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(MoviesItem);

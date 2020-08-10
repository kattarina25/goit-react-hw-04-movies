import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <ul className={styles.List}>
      <li className={styles.Item}>
        <NavLink
          exact
          to={routes.home}
          className={styles.Link}
          activeClassName={styles.Active}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.Item}>
        <NavLink
          to={routes.movies}
          className={styles.Link}
          activeClassName={styles.Active}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;

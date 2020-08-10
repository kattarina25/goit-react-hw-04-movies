import React, { Component } from 'react';
import Api from '../services/moviesApi';
import MoviesList from '../components/MoviesList';
import ErrorMessage from '../components/ErrorMessage';
import styles from './HomeView.module.css';

class HomeView extends Component {
  state = {
    movies: [],
    load: false,
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const movies = await Api.fetchTrending();
    this.setState({ movies, load: true });
  }

  render() {
    const { movies, load } = this.state;
    return (
      <>
        <h1 className={styles.Title}>Trending today</h1>
        {movies.length > 0 && <MoviesList movies={movies} />}
        {movies.length === 0 && load && <ErrorMessage />}
      </>
    );
  }
}

export default HomeView;

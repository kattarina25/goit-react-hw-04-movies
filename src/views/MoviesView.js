import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import SearchForm from '../components/SearchForm';
import Api from '../services/moviesApi';
import MoviesList from '../components/MoviesList';
import Container from '../components/Container';
import ErrorMessage from '../components/ErrorMessage';

class MoviesView extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    movies: [],
    searchQuery: '',
    error: null,
    empty: false,
  };

  componentDidMount() {
    const { location } = this.props;
    const { query } = queryString.parse(location.search);
    if (query) {
      this.fetch(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetch(searchQuery);
    }
  }

  fetch(query) {
    Api.fetchSearch(query)
      .then(movies => {
        if (movies.length === 0) this.setState({ empty: true });
        this.setState({ movies });
      })
      .catch(error => this.setState({ error }));
  }

  onChangeQuery = query => {
    const { history, location } = this.props;
    history.push({
      pathname: location.pathname,
      search: `query=${query}`,
    });
    this.setState({
      searchQuery: query,
      movies: [],
      error: null,
      empty: false,
    });
  };

  render() {
    const { movies, error, empty } = this.state;

    return (
      <Container>
        <SearchForm onSubmit={this.onChangeQuery} />
        {empty && <ErrorMessage />}
        {error && <ErrorMessage message="Not found" />}
        {movies.length > 0 && <MoviesList movies={movies} />}
      </Container>
    );
  }
}

export default MoviesView;

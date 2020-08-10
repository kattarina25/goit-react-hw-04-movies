import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink, Route } from 'react-router-dom';
import Api from '../../services/moviesApi';
import Container from '../Container';
import Cast from '../Cast';
import Reviews from '../Reviews';
import routes from '../../routes';
import styles from './AdditionalInfo.module.css';

class AdditionalInfo extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string.isRequired,
      }).isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.instanceOf(Object).isRequired,
    }).isRequired,
  };

  state = {
    cast: [],
    reviews: [],
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const { match } = this.props;
    const { movieId } = match.params;
    const cast = await Api.fetchCast(movieId);
    const reviews = await Api.fetchReviews(movieId);
    this.setState({
      cast,
      reviews,
    });
  }

  render() {
    const { match, location } = this.props;
    const { cast, reviews } = this.state;
    return (
      <>
        <section className={styles.AdditionalInfo}>
          <Container>
            <h4 className={styles.Title}>Additional information</h4>
            <nav>
              <ul className={styles.List}>
                <li className={styles.Item}>
                  <NavLink
                    to={{
                      pathname: `${match.url}/cast`,
                      state: location.state,
                    }}
                    className={styles.Link}
                    activeClassName={styles.Active}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={styles.Item}>
                  <NavLink
                    to={{
                      pathname: `${match.url}/reviews`,
                      state: location.state,
                    }}
                    className={styles.Link}
                    activeClassName={styles.Active}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </nav>
          </Container>
        </section>
        <Route
          path={routes.cast}
          render={() => {
            return cast.length > 0 ? (
              <Cast cast={cast} />
            ) : (
              <Container>
                <p>We do not have any info</p>
              </Container>
            );
          }}
        />
        <Route
          path={routes.reviews}
          render={() => {
            return reviews.length > 0 ? (
              <Reviews reviews={reviews} />
            ) : (
              <Container>
                <p>We dont&#39;t have any reviews for this movie</p>
              </Container>
            );
          }}
        />
      </>
    );
  }
}

export default withRouter(AdditionalInfo);

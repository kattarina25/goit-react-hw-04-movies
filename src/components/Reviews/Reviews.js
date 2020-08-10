import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';
import ReviewsItem from './ReviewsItem';
import styles from './Reviews.module.css';

const Reviews = ({ reviews }) => (
  <Container>
    <ul className={styles.List}>
      {reviews.map(({ id, author, content }) => (
        <li className={styles.Item} key={id}>
          <ReviewsItem author={author} content={content} />
        </li>
      ))}
    </ul>
  </Container>
);

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Reviews;

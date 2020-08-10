import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewsItem.module.css';

const ReviewsItem = ({ author, content }) => (
  <>
    <p className={styles.Author}>{author}</p>
    <p>{content}</p>
  </>
);

ReviewsItem.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ReviewsItem;

import React from 'react';
import styles from './AppBar.module.css';
import Container from '../Container';
import Navigation from '../Navigation';

const AppBar = () => {
  return (
    <header className={styles.AppBar}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
};

export default AppBar;

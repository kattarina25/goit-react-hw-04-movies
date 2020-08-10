import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import AppBar from './components/AppBar';
import Loader from './components/Loader';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
);

const MoviesView = lazy(() =>
  import('./views/MoviesView.js' /* webpackChunkName: "movies-view" */),
);

const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView.js' /* webpackChunkName: "movie-details-view" */
  ),
);

const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView.js' /* webpackChunkName: "movie-not-found-view" */
  ),
);

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={routes.home} component={HomeView} />
        <Route exact path={routes.movies} component={MoviesView} />
        <Route path={routes.movieDetails} component={MovieDetailsView} />
        <Route component={NotFoundView} />
      </Switch>
    </Suspense>
  </>
);

export default App;

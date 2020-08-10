import axios from 'axios';
import AUTH_TOKEN from './AUTH_TOKEN';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;

const fetchTrending = () => {
  return axios
    .get(`trending/movie/day`)
    .then(response => response.data.results);
};

const fetchSearch = query => {
  return axios
    .get(
      `/search/movie?language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(response => response.data.results);
};

const fetchFullInfo = movieId => {
  return axios.get(`/movie/${movieId}`).then(response => response.data);
};

const fetchCast = movieId => {
  return axios
    .get(`/movie/${movieId}/credits`)
    .then(response => response.data.cast);
};

const fetchReviews = movieId => {
  return axios
    .get(`/movie/${movieId}/reviews`)
    .then(response => response.data.results);
};

export default {
  fetchTrending,
  fetchSearch,
  fetchCast,
  fetchReviews,
  fetchFullInfo,
};

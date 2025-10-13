import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

api.defaults.headers.common['Authorization'] = import.meta.env.TMDB_API_KEY;

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;

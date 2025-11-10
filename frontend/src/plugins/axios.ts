import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

api.defaults.headers.common['Authorization'] = 'Bearer ' + import.meta.env.VITE_TMDB_KEY;
api.defaults.params = { language: 'pt-BR' };

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;

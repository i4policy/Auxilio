import axios from 'axios';
import axiosRetry from 'axios-retry';
import { AuthService } from '@/services/services.index';
import app from '../main';

const Request = axios.create();

axiosRetry(Request, { retries: 3 });

Request.interceptors.request.use((config) => {
  app.$store.commit('core/addPendingRequest');
  const token = AuthService.getAccessToken();
  if (token) {
    if (config.method !== 'OPTIONS') {
      // eslint-disable-next-line
      config.headers.Authorization = token;
    }
  }
  const currentLang = localStorage.getItem('currentLanguage');
  if (currentLang) {
    // eslint-disable-next-line
    config.headers.lang = currentLang;
  }
  return config;
});

/**
 * Response interceptor
 */
Request.interceptors.response.use(
  (response) => {
    app.$store.commit('core/removePendingRequest');
    return response.data;
  },
  (err) => {
    app.$store.commit('core/removePendingRequest');
    if (!err || !err.response || !err.response.status) {
      throw err;
    }
    const { status } = err.response;
    if (status === 401) {
      const url = err.request.responseURL.split('/');
      const path = url[url.length - 1];
      if (path !== 'login' && path !== 'logout-user') {
        app.$toast.open({
          message: 'Unauthorized access.',
          type: 'is-danger',
          position: 'is-top',
          duration: 5000
        });
      }
    } else {
      const message = (err.response && err.response.data && err.response.data.error && err.response.data.error.message) || 'Unknown error';
      app.$toast.open({
        message,
        type: 'is-danger',
        position: 'is-top',
        duration: 5000
      });
    }
    throw err.response.data.error;
  }
);

export default Request;

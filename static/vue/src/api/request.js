import axios from 'axios';
import axiosRetry from 'axios-retry';
import { AuthService } from '@/services';

import app from '../main';

const Request = axios.create();

axiosRetry(Request, { retries: 3 });

/**
 * Request interceptor
 */
Request.interceptors.request.use((config) => {
  app.$store.commit('core/addPendingRequest');
  const token = AuthService.getAccessToken();
  if (token) {
    if (config.method !== 'OPTIONS') {
      // eslint-disable-next-line
      config.headers.authorization = token;
    }
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
    // connection problem
    if (err.message === 'Network Error') {
      app.$toast.open({
        message: 'Network error.',
        type: 'is-danger',
        position: 'is-top',
        duration: 1000
      });
      throw err;
    }
    if (!err || !err.response) {
      throw err;
    }
    const { status } = err.response;
    const url = err.request.responseURL.split('/');
    const path = url[url.length - 1];

    // 401 - UNAUTHORIZED
    if (status === 401) {
      if (path !== 'login' && path !== 'logout-user') {
        app.$toast.open({
          message: 'Unauthorized access.',
          type: 'is-danger',
          position: 'is-top',
          duration: 1000
        });
      } else {
        app.$toast.open({
          message: 'Invalid credinitials.',
          type: 'is-danger',
          position: 'is-top',
          duration: 1000
        });
      }
      throw err.response.data.error;
    }

    if (status === 403) {
      app.$toast.open({
        message: err.response.data.error.message,
        type: 'is-danger',
        position: 'is-top',
        duration: 1000
      });
      throw err.response.data.error;
    }

    if (status === 422) {
      app.$toast.open({
        message: err.response.data.error.message,
        type: 'is-danger',
        position: 'is-top',
        duration: 1000
      });
      throw err.response.data.error;
    }

    // 500 - Internal Error
    if (status >= 500) {
      app.$toast.open({
        message: 'Internal error.',
        type: 'is-danger',
        position: 'is-top',
        duration: 1000
      });
      throw err.response.data.error;
    }

    // OTHER
    throw err.response.data.error;
  }
);

export default Request;

import { UserAccountAPI, API_ROOT } from '@/api/api.index';
import Router from '../router';

export const ACCESS_TOKEN_KEY = 'token';
export const PROFILE_KEY = 'profile';

const AuthService = {
  login(email, password) {
    const err = new Error();
    err.message = 'Invalid login parameters';
    err.statusCode = 400;

    return UserAccountAPI.login(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.token);
          localStorage.setItem(PROFILE_KEY, JSON.stringify({
            fullName: res.fullName,
            role: res.role,
            profilePicture: `${API_ROOT}/Containers/users/download/${res.profilePicture}`,
            title: res.title,
          }));
          return Promise.resolve(true);
        }
        return Promise.reject(err);
      })
      .catch(() => Promise.reject(err));
  },
  logout() {
    UserAccountAPI.logout().then(() => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(PROFILE_KEY);
      Router.push({ name: 'login' });
    });
  },

  logoutClientOnly() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    Router.push({ name: 'login' });
  },
  updateToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getProfile: () => JSON.parse(localStorage.getItem(PROFILE_KEY)),
  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== 'undefined';
  }
};

export default AuthService;

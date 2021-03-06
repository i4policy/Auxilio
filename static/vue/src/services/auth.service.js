import { UserAccountAPI } from '@/api';
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
          // if (res.status === 'INACTIVE') { return Promise.resolve(new Error('Your account is not activated yet.')); }
          localStorage.setItem(ACCESS_TOKEN_KEY, res.token);
          localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify({
              title: res.title,
              id: res.id,
              givenName: res.givenName,
              familyName: res.familyName,
              organization: res.organization,
              position: res.position,
              email: res.email,
              phoneNumber: res.phoneNumber,
              role: res.role,
              profilePicture: res.profilePicture,
            })
          );
          return Promise.resolve(true);
        }
        return Promise.reject(err);
      })
      .catch(() => {
        Promise.reject(err);
      });
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
  updateProfilePicture(profilePicture) {
    const currentProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    currentProfile.profilePicture = profilePicture;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(currentProfile));
  },
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getProfile: () => JSON.parse(localStorage.getItem(PROFILE_KEY)),
  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== 'undefined';
  },
  reset(email) {
    const err = new Error();
    err.message = 'Invalid parameters';
    err.statusCode = 400;

    return UserAccountAPI.reset(email)
      .then(() => {
        Router.push({ name: 'login' });
      })
      .catch(() => Promise.reject(err));
  },
  changePassword(resetToken, newPassword) {
    const err = new Error();
    err.message = 'Invalid parameters';
    err.statusCode = 400;

    return UserAccountAPI.changePassword(resetToken, newPassword)
      .then(() => {
        Router.push({ name: 'login' });
      })
      .catch(() => Promise.reject(err));
  }
};

export default AuthService;

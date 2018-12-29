import { UserAccountAPI } from '@/api/api.index';
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
            profilePicture: res.profilePicture,
            title: res.title,
          }));
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
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getProfile: () => JSON.parse(localStorage.getItem(PROFILE_KEY)),
  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== 'undefined';
  },
  reset(email, userDetail) {
    const err = new Error();
    err.message = 'Invalid parameters';
    err.statusCode = 400;

    return UserAccountAPI.reset(email, userDetail)
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
  },
  getUserMachineDetail() {
    const { userAgent } = navigator;
    let browserName = navigator.appName;
    let fullVersion = `${parseFloat(navigator.appVersion)}`;
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset; let verOffset; let
      ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = userAgent.indexOf('Opera')) !== -1) {
      browserName = 'Opera';
      fullVersion = userAgent.substring(verOffset + 6);
      if ((verOffset = userAgent.indexOf('Version')) !== -1)
        {fullVersion = userAgent.substring(verOffset+8);}
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = userAgent.indexOf('MSIE')) !== -1) {
      browserName = 'Microsoft Internet Explorer';
      fullVersion = userAgent.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = userAgent.indexOf('Chrome')) !== -1) {
      browserName = 'Chrome';
      fullVersion = userAgent.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = userAgent.indexOf('Safari')) !== -1) {
      browserName = 'Safari';
      fullVersion = userAgent.substring(verOffset + 7);
      if ((verOffset = userAgent.indexOf('Version')) !== -1)
        {fullVersion = userAgent.substring(verOffset+8);}
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = userAgent.indexOf('Firefox')) !== -1) {
      browserName = 'Firefox';
      fullVersion = userAgent.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) 
           < (verOffset = userAgent.lastIndexOf('/')))
    {
      browserName = userAgent.substring(nameOffset, verOffset);
      fullVersion = userAgent.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1) {fullVersion=fullVersion.substring(0,ix);}
    if ((ix = fullVersion.indexOf(' ')) !== -1) {fullVersion=fullVersion.substring(0,ix);}

    majorVersion = parseInt(`${fullVersion}`, 10);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(majorVersion)) {
      fullVersion = `${parseFloat(navigator.appVersion)}`;
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
    if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS';
    if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
    if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';

    return {
      browserName,
      fullVersion,
      majorVersion,
      userAgent,
      OSName
    };
  }
};

export default AuthService;

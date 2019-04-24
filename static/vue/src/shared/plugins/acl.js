/* eslint no-param-reassign:0 */

import { AuthService } from '@/services';

const acl = {
  isAdmin() {
    return AuthService.getProfile().role === 'Admin';
  },
  isModerator() {
    return AuthService.getProfile().role === 'Moderator';
  },
  hasModeratorPermission() {
    const isAdmin = (AuthService.getProfile().role === 'Admin') || (AuthService.getProfile().role === 'Moderator');
    // return isAdmin || object.isOwner;
    return isAdmin;
  },
  hasPermission(object) {
    const isAdmin = (AuthService.getProfile().role === 'Admin') || (AuthService.getProfile().role === 'Moderator');
    return isAdmin || object.isOwner;
  }
};

export default {
  install(V) {
    V.prototype.$acl = acl;
  }
};

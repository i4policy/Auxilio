/* eslint no-param-reassign:0 */

import { AuthService } from '@/services';

const acl = {
  isAdmin() {
    return AuthService.getProfile().role === 'admin';
  },
  hasPermission(object) {
    const isAdmin = AuthService.getProfile().role === 'admin';
    return isAdmin || object.isOwner;
  }
};

export default {
  install(V) {
    V.prototype.$acl = acl;
  }
};

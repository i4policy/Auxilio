/* eslint no-param-reassign:0 */

import Vue from 'vue';
import { AuthService } from '@/services/services.index';

const acl = {
  isAdmin() {
    return AuthService.getProfile().role === 'admin';
  },
  hasPermission(object) {
    const isAdmin = AuthService.getProfile().role === 'admin';
    return isAdmin || object.isOwner;
  }
};

const aclPlugin = {
  install(V) {
    V.prototype.$acl = acl;
  }
};

Vue.use(aclPlugin);

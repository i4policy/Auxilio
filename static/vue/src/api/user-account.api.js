import { API_ROOT } from '.';
import Request from './request';

const PATH = '/UserAccounts';

const UserAccountAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  },
  all(filter) {
    return Request.get(`${API_ROOT}${PATH}`, {
      params: filter
    });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}`, data);
  },
  update(data) {
    return Request.patch(`${API_ROOT}${PATH}/${data.id}`, data);
  },
  remove(id) {
    return Request.delete(`${API_ROOT}${PATH}/${id}`);
  },
  logout() {
    return Request.post(`${API_ROOT}${PATH}/logout-user`);
  },
  login(email, password) {
    return Request.post(`${API_ROOT}${PATH}/login`, {
      email,
      password
    });
  },
  registerMember(data) {
    return Request.post(`${API_ROOT}${PATH}/register-member`, data);
  },
  reset(email, userInfo) {
    return Request.post(`${API_ROOT}${PATH}/app-password-reset-request`, {
      email,
      userInfo
    });
  },
  changePassword(resetToken, newPassword) {
    return Request.post(`${API_ROOT}${PATH}/app-verify-reset-password`, {
      resetToken,
      newPassword
    });
  },
  getMyProfile(limit, skip) {
    return Request.post(`${API_ROOT}${PATH}/my-profile`, {
      limit,
      skip
    });
  },
  updatMyProfile(data) {
    return Request.patch(`${API_ROOT}${PATH}/update-my-account`, data);
  }
};

export default UserAccountAPI;

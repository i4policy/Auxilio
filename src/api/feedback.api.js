import { API_ROOT } from './api.index';
import Request from './request';

const PATH = '/Feedbacks';

const FeedbackAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  },
  all(filter) {
    return Request.get(`${API_ROOT}${PATH}`, {
      params: filter
    });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}/create-feedback`, data);
  },
  update(data) {
    return Request.put(`${API_ROOT}${PATH}/update-my-feedback`, data);
  },
  remove(data) {
    return Request.delete(`${API_ROOT}${PATH}/delete-my-feedback`, data);
  }
};

export default FeedbackAPI;

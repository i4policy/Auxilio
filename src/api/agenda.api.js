import { API_ROOT } from './api.index';
import Request from './request';

const PATH = '/Posts';

const AgendaAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/detail`, {
      params: {
        postId: id
      }
    });
  },
  all(filter) {
    return Request.get(`${API_ROOT}${PATH}/list`, {
      params: filter
    });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}/create-post`, data);
  },
  update(data) {
    return Request.patch(`${API_ROOT}${PATH}/${data.id}`, data);
  },
  remove(id) {
    return Request.delete(`${API_ROOT}${PATH}/${id}`);
  },
};

export default AgendaAPI;

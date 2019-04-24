import { API_ROOT } from '.';
import Request from './request';

const MAIN_TOPIC_PATH = '/MainTopics';
const PATH = '/Posts';

const AgendaAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`, {
      params: {
        postId: id
      }
    });
  },
  detail(id) {
    return Request.get(`${API_ROOT}${PATH}/detail`, {
      params: {
        postId: id
      }
    });
  },
  all(filter) {
    return Request.get(`${API_ROOT}${MAIN_TOPIC_PATH}/list`, {
      params: { filter }
    });
  },
  allSubTopics(filter, limit = 0) {
    return Request.get(`${API_ROOT}${PATH}/list`, {
      params: { filter, limit }
    });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}/create-post`, data);
  },
  createMainTopic(data) {
    return Request.post(`${API_ROOT}${MAIN_TOPIC_PATH}/create-topic`, data);
  },
  update(data) {
    return Request.patch(`${API_ROOT}${PATH}/update-my-post`, data);
  },
  remove(postId, reasonToDelete) {
    return Request.delete(`${API_ROOT}${PATH}/delete-my-post`, { data: { postId, reasonToDelete } });
  },
  removeMainTopic(id) {
    return Request.delete(`${API_ROOT}${MAIN_TOPIC_PATH}/${id}`);
  },
  invite(data) {
    return Request.post(`${API_ROOT}${MAIN_TOPIC_PATH}/invite`, data);
  },
  confirmInvitation(data) {
    return Request.post(`${API_ROOT}${MAIN_TOPIC_PATH}/confirm-invitation`, data);
  },
  leaveTopic(data) {
    return Request.post(`${API_ROOT}${MAIN_TOPIC_PATH}/leave-topic`, data);
  },
};

export default AgendaAPI;

import { API_ROOT } from './api.index';
import Request from './request';

const PATH = '/FeedbackReplies';

const CommentAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  },
  all(filter) {
    return Request.get(`${API_ROOT}${PATH}`, {
      params: filter
    });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}/create-reply`, data);
  },
  update(data) {
    return Request.patch(`${API_ROOT}${PATH}/update-my-reply`, data);
  },
  remove(replyId) {
    return Request.delete(`${API_ROOT}${PATH}/delete-my-reply`, { data: { replyId } });
  }
};

export default CommentAPI;

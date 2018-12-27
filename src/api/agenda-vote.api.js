import { API_ROOT } from './api.index';
import Request from './request';

const PATH = '/UserPostVote';

const AgendaVoteAPI = {
  vote(data) {
    return Request.post(`${API_ROOT}${PATH}`, data);
  }
};

export default AgendaVoteAPI;

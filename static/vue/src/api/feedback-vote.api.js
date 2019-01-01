import { API_ROOT } from '.';
import Request from './request';

const PATH = '/UserFeedbackVote';

const FeedbackVoteAPI = {
  vote(data) {
    return Request.post(`${API_ROOT}${PATH}`, data);
  }
};

export default FeedbackVoteAPI;

import UserAccountAPI from './user-account.api';
import AgendaAPI from './agenda.api';
import PostCategoryAPI from './post-category.api';
import FeedbackAPI from './feedback.api';
import CommentAPI from './comment.api';
import AgendaVoteAPI from './agenda-vote.api';

const API_ROOT = process.env.VUE_APP_API_ROOT || window.location.origin;
// eslint-disable-next-line
export { 
  API_ROOT,
  UserAccountAPI,
  AgendaAPI,
  PostCategoryAPI,
  FeedbackAPI,
  CommentAPI,
  AgendaVoteAPI
};

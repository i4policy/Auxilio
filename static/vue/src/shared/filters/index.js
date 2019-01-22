import LimitTo from './limit-to.filter';
import FormatDate from './format-date.filter';
import FormatVote from './format-vote.filter';
import FormatName from './format-name.filter';

export default {
  install(Vue) {
    Vue.filter('limitTo', LimitTo);
    Vue.filter('formatDate', FormatDate);
    Vue.filter('formatVote', FormatVote);
    Vue.filter('formatName', FormatName);
  }
};

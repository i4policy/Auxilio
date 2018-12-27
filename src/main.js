import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import '@/plugins/buefy';
import '@/plugins/shared-components';
import '@/plugins/vue-img-fallback';
import '@/plugins/vue-wysiwyg';
import '@/plugins/vee-validate';

Vue.config.productionTip = false;

const shortMonthName = (month) => {
  const shortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  return shortNames[month];
};

Vue.filter('limitTo', (text, length, clamp) => {
  const t = text || '';
  const l = length || 50;
  const c = clamp || '';
  return t.slice(0, l) + c;
});

Vue.filter('formatDate', (value) => {
  if (value) {
    const date = new Date(value);
    const isDate = date instanceof Date;
    if (!date || !isDate) {
      return '';
    }
    const year = date.getFullYear();
    const month = shortMonthName(date.getMonth());
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  }
  return '';
});

Vue.filter('formatVote', (value) => {
  if (value) {
    return value > 999 ? `${(value / 1000).toFixed(1) }k` : value;
  }
  return 0;
});


export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

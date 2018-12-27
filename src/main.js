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


Vue.filter('limitTo', (text, length, clamp) => {
  const t = text || '';
  const l = length || 50;
  const c = clamp || '';
  return t.slice(0, l) + c;
});

Vue.filter('formatDate', (value) => {
  if (value) {
    return new Date(value).toISOString().slice(0, 10);
  }
  return '';
});


export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

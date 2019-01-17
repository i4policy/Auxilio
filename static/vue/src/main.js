import Vue from 'vue';

// Third party
import '@/plugins/buefy';
import '@/plugins/vue-img-fallback';
import '@/plugins/vue-wysiwyg';
import '@/plugins/vee-validate';
import '@/plugins/ckeditor';
import '@/plugins/vue-escape';
import '@/plugins/vue-tel-input';

// Internal
import '@/shared';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

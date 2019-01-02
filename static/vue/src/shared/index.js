import Vue from 'vue';
import components from './components';
import filters from './filters';
import plugins from './plugins';

const shared = {
  install(v) {
    v.use(components);
    v.use(filters);
    v.use(plugins);
  }
};

Vue.use(shared);

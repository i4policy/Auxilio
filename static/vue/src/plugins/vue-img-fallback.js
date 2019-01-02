import Vue from 'vue';
import VueImgFallback from 'v-img-fallback';

Vue.use(VueImgFallback, {
  loading: '@/assets/logo.svg',
  error: 'https://bulma.io/images/placeholders/128x128.png'
});

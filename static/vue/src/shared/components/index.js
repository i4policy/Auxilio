import Tag from './Tag.vue';
import ProfilePictureUpload from './ProfilePictureUpload.vue';

export default {
  install(Vue) {
    Vue.component('tag', Tag);
    Vue.component('ProfilePictureUpload', ProfilePictureUpload);
  }
};

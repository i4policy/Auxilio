import Tag from './Tag.vue';
import ProfilePictureUpload from './ProfilePictureUpload.vue';
import ConfirmationDialog from './ConfirmationDialog.vue';

export default {
  install(Vue) {
    Vue.component('tag', Tag);
    Vue.component('ProfilePictureUpload', ProfilePictureUpload);
    Vue.component('ConfirmationDialog', ConfirmationDialog);
  }
};

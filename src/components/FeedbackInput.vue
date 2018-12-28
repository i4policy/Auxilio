<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img
          :src="userProfile.profilePicture"
          class="is-rounded"
          v-img-fallback="'/user-placeholder.png'"
        >
      </p>
    </figure>
    <div class="media-content">
      <b-field :type="{'is-danger': errors.has('feedback')}" :message="errors.first('feedback')">
        <b-input
          v-model="item.body"
          v-validate="'required'"
          type="textarea"
          minlength="1"
          name="feedback"
          placeholder="Add a feedbcak..."
        />
      </b-field>

      <FilePreview v-if="file && fileMeta" :bucket="'feedback'" :file="file" :meta="fileMeta"/>

      <div class="columns">
        <div class="column">
          <div class="field">
            <p class="control attachment-btn">
              <button class="button" @click="openAttachFile">
                <b-icon icon="attachment"></b-icon>
              </button>
            </p>
            <p class="control attachment-btn">
              <button class="button is-primary" @click="postFeedback()">Post feedback</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import { AuthService } from '@/services/services.index';
import { FeedbackAPI } from '@/api/api.index';
import FileUpload from '@/components/FileUpload.vue';
import FilePreview from '@/components/FilePreview.vue';
import { Bus, events } from '@/util/Bus';

export default {
  name: 'FeedbackInput',
  components: {
    FilePreview
  },
  props: {
    postId: {
      type: [String],
      default: () => ''
    }
  },
  data() {
    return {
      item: { body: '' },
      file: null,
      fileMeta: null,
      userProfile: {}
    };
  },
  mounted() {
    console.log(this.postId);
  },
  created() {
    Bus.$on(events.ON_FILE_ATTACHED, (data) => {
      this.onFileAttach(data);
    });
    this.userProfile = AuthService.getProfile();
  },
  destroyed() {
    Bus.$off(events.ON_FILE_ATTACHED);
  },
  methods: {
    resetData() {
      this.file = null;
      this.fileMeta = null;
      this.item = { body: '' };
    },
    openAttachFile() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        component: FileUpload,
        hasModalCard: true
      });
    },
    onFileAttach(data) {
      const { file, meta } = data;
      this.file = file;
      this.fileMeta = meta;
    },
    async postFeedback() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      this.item.postId = this.postId;

      const formData = new FormData();
      Object.keys(this.item).forEach((key) => {
        formData.append(key, this.item[key]);
      });
      // add file meta data
      formData.append('fileMeta', JSON.stringify(this.fileMeta));

      // add files
      formData.append('file', this.file);

      const response = await FeedbackAPI.create(formData);
      this.$toast.open({
        message: 'Feedback posted successfully.',
        type: 'is-success',
        position: 'is-top'
      });
      this.resetData();
      this.$nextTick(() => this.$validator.reset());
      this.$emit('success', response);
    }
  }
};
</script>

<style scoped>
.attachment-btn {
  display: inline;
  margin-right: 6px;
}

.card-title-small {
  color: #000;
  font-size: 14px !important;
  margin-bottom: 5px !important;
}
</style>

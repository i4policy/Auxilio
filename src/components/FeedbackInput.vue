<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="userProfile.profilePicture" class="is-rounded" v-img-fallback="'/user-placeholder.png'">
      </p>
    </figure>
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea v-model="body" class="textarea" placeholder="Add a feedback..."></textarea>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="postFeedback()">Post feedback</button>
        </p>
      </div>
    </div>
  </article>
</template>
<script>
import { AuthService } from '@/services/services.index';
import { FeedbackAPI } from '@/api/api.index';

export default {
  name: 'FeedbackInput',
  props: {
    postId: {
      type: [String],
      default: () => ''
    }
  },
  data() {
    return {
      body: '',
      userProfile: {}
    };
  },
  created() {
    this.userProfile = AuthService.getProfile();
  },
  methods: {
    async postFeedback() {
      console.log(this.body, this.postId);

      const formData = new FormData();
      const item = {
        body: this.body,
        postId: this.postId
      };
      Object.keys(item).forEach((key) => {
        formData.append(key, item[key]);
      });
      await FeedbackAPI.create(formData);
      this.$toast.open({
        message: 'Feedback posted successfully.',
        type: 'is-success',
        position: 'is-top'
      });
    }
  }
};
</script>

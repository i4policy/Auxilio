<template>
  <article class="">
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea v-model="bodyContent" class="textarea" placeholder="Add a feedback..."></textarea>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="editFeedback()">Edit feedback</button>
        </p>
      </div>
    </div>
    <br>
  </article>
</template>
<script>
import { AuthService } from '@/services/services.index';
import { FeedbackAPI } from '@/api/api.index';

export default {
  name: 'FeedbackEdit',
  props: {
    feedbackId: {
      type: [String],
      default: () => ''
    },
    body: {
      type: [String],
      default: () => ''
    }
  },
  data() {
    return {
      userProfile: {},
      bodyContent: this.body
    };
  },
  created() {
    this.userProfile = AuthService.getProfile();
  },
  methods: {
    async editFeedback() {
      const formData = new FormData();
      formData.append('body', JSON.stringify({
        body: this.bodyContent,
        id: this.feedbackId
      }));
      await FeedbackAPI.update(formData);
      this.$toast.open({
        message: 'Feedback edited successfully.',
        type: 'is-success',
        position: 'is-top'
      });
    }
  }
};
</script>

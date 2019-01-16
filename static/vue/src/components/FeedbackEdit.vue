<template>
  <article class>
    <div class="media-content">
      <b-field :type="{'is-danger': errors.has('feedback')}" :message="errors.first('feedback')">
        <b-input
          v-model="bodyContent"
          v-validate="'required'"
          type="textarea"
          minlength="1"
          name="feedback"
          placeholder="Add a comment..."
        />
      </b-field>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="editFeedback()">Edit comment</button>
        </p>
      </div>
    </div>
    <br>
  </article>
</template>
<script>
import { AuthService } from '@/services';
import { FeedbackAPI } from '@/api';

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
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      const formData = new FormData();
      formData.append('body', this.bodyContent);
      formData.append('id', this.feedbackId);
      const response = await FeedbackAPI.update(formData);
      this.$toast.open({
        message: 'Comment edited successfully.',
        type: 'is-success',
        position: 'is-top'
      });
      this.$emit('success', response);
    }
  }
};
</script>

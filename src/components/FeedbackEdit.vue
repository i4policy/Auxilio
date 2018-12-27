<template>
  <article class="">
    <div class="media-content">
      <b-field
        label="Title"
        :type="{'is-danger': errors.has('feedback')}"
        :message="errors.first('feedback')"
      >
        <b-input
          v-model="body"
          v-validate="'required'"
          type="textarea"
          minlength="1"
          name="feedback"
          placeholder="Add a feedbcak..."
        />
      </b-field>
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
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      const formData = new FormData();
      formData.append('body', this.bodyContent);
      formData.append('id', this.feedbackId);
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

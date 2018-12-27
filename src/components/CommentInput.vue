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
      <b-field
        label="Title"
        :type="{'is-danger': errors.has('comment')}"
        :message="errors.first('comment')"
      >
        <b-input
          v-model="body"
          v-validate="'required'"
          type="textarea"
          minlength="1"
          name="comment"
          placeholder="Add a comment..."
        />
      </b-field>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="postComment()">Post comment</button>
        </p>
      </div>
    </div>
  </article>
</template>
<script>
import { AuthService } from '@/services/services.index';
import { CommentAPI } from '@/api/api.index';

export default {
  name: 'CommentInput',
  props: {
    feedbackId: {
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
    async postComment() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      const formData = new FormData();
      const item = {
        body: this.body,
        feedbackId: this.feedbackId
      };
      Object.keys(item).forEach((key) => {
        formData.append(key, item[key]);
      });
      const response = await CommentAPI.create(formData);
      this.$toast.open({
        message: 'Comment posted successfully.',
        type: 'is-success',
        position: 'is-top'
      });
      this.body = '';
      this.$nextTick(() => this.$validator.reset());
      this.$emit('success', response);
    }
  }
};
</script>

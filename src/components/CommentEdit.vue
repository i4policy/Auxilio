<template>
  <article class="media">
    <div class="media-content">
      <b-field
        :type="{'is-danger': errors.has('comment')}"
        :message="errors.first('comment')"
      >
        <b-input
          v-model="bodyContent"
          v-validate="'required'"
          type="textarea"
          minlength="1"
          name="comment"
          placeholder="Add a comment..."
        />
      </b-field>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="editComment()">Edit comment</button>
        </p>
      </div>
    </div>
    <br>
  </article>
</template>
<script>
import { AuthService } from '@/services/services.index';
import { CommentAPI } from '@/api/api.index';

export default {
  name: 'CommentInput',
  props: {
    commentId: {
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
      bodyContent: this.body,
      userProfile: {}
    };
  },
  created() {
    this.userProfile = AuthService.getProfile();
  },
  methods: {
    async editComment() {
      const valid = await this.$validator.validateAll();
      if (!valid) {
        return;
      }
      const formData = new FormData();
      formData.append('id', this.commentId);
      formData.append('body', this.bodyContent);
      await CommentAPI.update(formData);
      this.$toast.open({
        message: 'Comment updated successfully.',
        type: 'is-success',
        position: 'is-top'
      });
    }
  }
};
</script>

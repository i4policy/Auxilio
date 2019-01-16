<template>
  <article class="media">
    <figure class="media-left">
      <user-avatar
        :bucket="bucket"
        :size="64"
        :file-name="userProfile.profilePicture"
        :show-me="true"
      />
    </figure>
    <div class="media-content">
      <b-field :type="{'is-danger': errors.has('comment')}" :message="errors.first('comment')">
        <b-input
          v-model="body"
          v-validate="'required'"
          type="textarea"
          minlength="1"
          name="comment"
          placeholder="Add a reply..."
        />
      </b-field>
      <div class="field">
        <p class="control">
          <button class="button is-primary" @click="postComment()">Post reply</button>
        </p>
      </div>
    </div>
  </article>
</template>
<script>
import { AuthService } from '@/services';
import { CommentAPI } from '@/api';
import UserAvatar from './UserAvatar.vue';

export default {
  name: 'CommentInput',
  components: {
    UserAvatar
  },
  props: {
    feedbackId: {
      type: [String],
      default: () => ''
    }
  },
  data() {
    return {
      body: '',
      userProfile: {},
      bucket: 'users'
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
        message: 'reply posted.',
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

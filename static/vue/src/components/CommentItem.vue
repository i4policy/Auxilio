<template>
  <article class="media">
    <figure class="media-left">
      <user-avatar
        v-if="comment.createdBy"
        :bucket="'users'"
        :size="64"
        :file-name="comment.createdBy.profilePicture"
      />
    </figure>
    <div class="media-content">
      <div class="content" v-if="!editMode">
        <p>
          <strong v-if="comment.createdBy">{{comment.createdBy.fullName}}</strong>
          <br>
          {{comment.body}}
          <br>
          <small>{{comment.createdAt | formatDate}}</small>
          &nbsp;&nbsp;
          <small
            v-if="$acl.hasPermission(comment)"
            class="has-text-link pointer"
            @click="editComment"
          >EDIT</small>
          &nbsp;&nbsp;
          <small
            v-if="$acl.hasPermission(comment)"
            class="has-text-danger pointer"
            @click="deleteComment"
          >DELETE</small>
        </p>
      </div>
      <div v-if="editMode">
        <comment-edit
          @success="handleCommentUpdated($event)"
          :comment-id="comment.id"
          :body="comment.body"
        />
      </div>
    </div>
  </article>
</template>
<script>
import { CommentAPI } from '@/api';
import CommentEdit from './CommentEdit.vue';
import UserAvatar from './UserAvatar.vue';

export default {
  name: 'FeedbackReplyItem',
  components: {
    CommentEdit,
    UserAvatar
  },
  props: {
    comment: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
    return {
      editMode: false
    };
  },
  methods: {
    handleCommentUpdated(data) {
      this.comment = data;
      this.editMode = false;
    },
    editComment() {
      this.editMode = true;
    },
    deleteComment() {
      this.$dialog.confirm({
        title: 'Deleting comment',
        message:
          'Are you sure you want to <b>delete</b> your comment? This action cannot be undone.',
        confirmText: 'Delete Comment',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await CommentAPI.remove(this.comment.id);
          this.$toast.open({
            message: 'Comment deleted successfully.',
            type: 'is-success',
            position: 'is-top'
          });
          this.$emit('deleted');
        }
      });
    }
  }
};
</script>

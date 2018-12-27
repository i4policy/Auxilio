<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-48x48">
        <img class="is-rounded" src v-img-fallback="'/user-placeholder.png'">
      </p>
    </figure>
    <div class="media-content">
      <div class="content" v-if="!editMode">
        <p>
          <strong v-if='comment.createdBy'>{{comment.createdBy.fullName}}</strong>
          <br>
          {{comment.body}}
          <br>
          <small>{{comment.createdAt | formatDate}}</small>
           &nbsp;&nbsp;
          <small class="has-text-link pointer" @click="editComment()">EDIT</small>
            &nbsp;&nbsp;
          <small class="has-text-danger pointer" @click="deleteComment()">DELETE</small>
        </p>
      </div>
      <div v-if="editMode">
          <comment-edit :comment-id="comment.id" :body="comment.body" />
      </div>
    </div>
  </article>
</template>
<script>
import { CommentAPI } from '@/api/api.index';
import CommentEdit from './CommentEdit.vue';

export default {
  name: 'FeedbackReplyItem',
  components: {
    CommentEdit
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
    editComment() {
      this.editMode = true;
    },
    deleteComment() {
      this.$dialog.confirm({
        title: 'Deleting comment',
        message: 'Are you sure you want to <b>delete</b> your comment? This action cannot be undone.',
        confirmText: 'Delete Comment',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await CommentAPI.remove({
            replyId: this.comment.id
          });
          this.$toast.open({
            message: 'Comment deleted successfully.',
            type: 'is-success',
            position: 'is-top'
          });
        }
      });
    }
  }
};
</script>

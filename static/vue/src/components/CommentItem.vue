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
    <div class="media-content" :id="`target-${comment.id}`">
      <div class="content" v-if="!editMode">
        <p>
          <strong class="comment-creater" v-if="comment.createdBy"  @click.stop="openProfile(comment.createdBy.id)">{{`${comment.createdBy.givenName} ${comment.createdBy.familyName}`}}</strong>
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
          <small
            v-if="$acl.hasPermission(comment)"
            class="has-text-link pointer show-reply"
            @click="showReplyBox = !showReplyBox"
          ><b-icon icon="reply" type="is-info" size="is-small"></b-icon>reply</small>
        </p>
      </div>
      <div v-if="editMode">
        <comment-edit
          @success="handleCommentUpdated($event)"
          :comment-id="comment.id"
          :body="comment.body"
        />
      </div>
      <comment-reply-item
        v-for="(comment, i) in comment.replies"
        @deleted="handleDeleteSuccess(i)"
        :key="i"
        :comment="comment"
      />
      <div v-if="showReplyBox">
        <comment-reply-input @success="handleNewReply($event)" :reply-id="comment.id"/>
      </div>
    </div>
  </article>
</template>
<script>
import { CommentAPI } from '@/api';
import CommentEdit from './CommentEdit.vue';
import UserAvatar from './UserAvatar.vue';
import CommentReplyInput from './CommentReplyInput.vue';
import CommentReplyItem from './CommentReplyItem.vue';

export default {
  name: 'FeedbackReplyItem',
  components: {
    CommentEdit,
    UserAvatar,
    CommentReplyInput,
    CommentReplyItem
  },
  props: {
    comment: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
    return {
      editMode: false,
      showReplyBox: false
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
        title: 'Deleting reply',
        message:
          'Are you sure you want to <b>delete</b> your reply? This action cannot be undone.',
        confirmText: 'Delete Reply',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await CommentAPI.remove(this.comment.id);
          this.$toast.open({
            message: 'Reply deleted.',
            type: 'is-success',
            position: 'is-top'
          });
          this.$emit('deleted');
        }
      });
    },
    openProfile(id) {
      this.$router.push({ name: 'profile', query: { userAccountId: id } });
    },
    handleNewReply(reply) {
      if (!reply) return;
      if (!this.comment.replies) {
        const replies = [reply];
        this.$set(this.comment, 'replies', replies);
      } else {
        const { replies } = this.comment;
        replies.push(reply);
        this.$set(this.comment, 'replies', replies);
      }
    },
    handleDeleteSuccess(index) {
      if (Number.isNaN(index) || !this.comment || !this.comment.replies) {
        return;
      }
      this.comment.replies.splice(index, 1);
    },
  }
};
</script>
<style>
.comment-creater {
  cursor: pointer;
}
.comment-creater:hover {
  color: #593c79;
}
.show-reply {
  margin-left: 10px;
}
</style>

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
          <strong class="comment-creater" v-if="comment.createdBy"  @click.stop="openProfile(comment.createdBy.id)">{{comment.createdBy.fullName}}</strong>
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
        <comment-reply-edit
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
import CommentReplyEdit from './CommentReplyEdit.vue';
import UserAvatar from './UserAvatar.vue';

export default {
  name: 'CommentReplyItem',
  components: {
    CommentReplyEdit,
    UserAvatar,
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
    }
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
</style>

<template>
  <article class="media">
    <figure class="media-left">
      <figure class="media-left">
        <user-avatar
          v-if="feedback.createdBy"
          :bucket="bucket"
          :size="64"
          :file-name="feedback.createdBy.profilePicture"
        />
      </figure>
    </figure>
    <div class="media-content" :id="`target-${feedback.id}`">
      <div class="content" v-if="!editMode">
        <div class="columns">
          <div class="column">
            <p>
              <strong
                class="feedback-creater"
                v-if="feedback.createdBy"
                @click.stop="openProfile(feedback.createdBy.id)"
              >{{feedback.createdBy.title}} {{feedback.createdBy.fullName}}</strong>
              <br>
              {{feedback.body}}
              <br>
              <small>
                <b-icon icon="thumb-up" type="is-primary" size="is-small"></b-icon>
                <small>{{feedback.upVote}}</small>
                &nbsp;·&nbsp;
                <b-icon icon="thumb-down" type="is-grey-lighter" size="is-small"></b-icon>
                <small>{{feedback.downVote}}</small>
                &nbsp;·&nbsp;
                {{feedback.createdAt | formatDate}}
                &nbsp;&nbsp;
                <small
                  v-if="$acl.hasPermission(feedback)"
                  class="has-text-link pointer"
                  @click="editFeedback()"
                >EDIT</small>
                &nbsp;&nbsp;
                <small
                  v-if="$acl.hasPermission(feedback)"
                  class="has-text-danger pointer"
                  @click="deleteFeedback"
                >DELETE</small>
              </small>
            </p>
          </div>
          <div class="column is-narrow" style="align-items:center; display: flex;">
            <div class="is-block">
              <div class="is-block has-text-centered">
                <b-tooltip label="Up Vote">
                  <b-icon
                    @click.native="vote(1)"
                    icon="thumb-up"
                    :type="getAgendaVoteStateClass('up')"
                    size="is-small"
                    custom-class="pointer"
                  ></b-icon>
                </b-tooltip>
              </div>
              <div class="is-block">
                <hr>
              </div>
              <div class="is-block has-text-centered">
                <b-tooltip label="Down Vote" ition="is-bottom" type="is-dark">
                  <b-icon
                    @click.native="vote(-1)"
                    icon="thumb-down"
                    :type="getAgendaVoteStateClass('down')"
                    size="is-small"
                    custom-class="pointer"
                  ></b-icon>
                </b-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="editMode">
        <feedback-edit
          @success="handleFeedbackUpdated($event)"
          :feedback-id="feedback.id"
          :body="feedback.body"
        />
      </div>

      <template v-if="feedback.files && feedback.files.length">
        <FilePreview
          v-for="(file,index) in feedback.files"
          :bucket="'feedback'"
          :key="index"
          :fileData="file"
        />
      </template>

      <comment-item
        v-for="(comment, i) in feedback.replies"
        @deleted="handleDeleteSuccess(i)"
        :key="i"
        :comment="comment"
      />
      <comment-input @success="handleNewComment($event)" :feedback-id="feedback.id"/>
    </div>
  </article>
</template>
<script>
import CommentItem from './CommentItem.vue';
import CommentInput from './CommentInput.vue';
import FeedbackEdit from './FeedbackEdit.vue';
import FilePreview from '@/components/FilePreview.vue';
import { FeedbackAPI, FeedbackVoteAPI } from '@/api';
import UserAvatar from './UserAvatar.vue';

export default {
  name: 'FeedbackItem',
  components: {
    FilePreview,
    CommentItem,
    CommentInput,
    FeedbackEdit,
    UserAvatar
  },
  props: {
    feedback: {
      type: [Object],
      default: () => ({})
    }
  },
  data() {
    return {
      editMode: false,
      bucket: 'users'
    };
  },
  methods: {
    handleFeedbackUpdated(data) {
      this.feedback = data;
      this.editMode = false;
    },
    handleDeleteSuccess(index) {
      if (Number.isNaN(index) || !this.feedback || !this.feedback.replies) {
        return;
      }
      this.feedback.replies.splice(index, 1);
    },
    getAgendaVoteStateClass(type) {
      if (type === 'up') {
        return this.feedback.voted === 1 ? 'is-info' : 'is-grey-lighter';
      }
      if (type === 'down') {
        return this.feedback.voted === -1 ? 'is-info' : 'is-grey-lighter';
      }
      return '';
    },
    async vote(vote) {
      const result = await FeedbackVoteAPI.vote({
        feedbackId: this.feedback.id,
        vote
      });
      if (result) {
        this.$set(this.feedback, 'upVote', result.upVote);
        this.$set(this.feedback, 'downVote', result.downVote);
        this.$set(this.feedback, 'voted', result.voted);
      }

      if (result.upVote === 1) {
        this.$toast.open({
          message: 'Up voted',
          type: 'is-primary',
          position: 'is-top',
          duration: 500
        });
      } else if (result.downVote === 1) {
        this.$toast.open({
          message: 'Down voted',
          type: 'is-primary',
          position: 'is-top',
          duration: 500
        });
      } else {
        this.$toast.open({
          message: 'Vote cleared',
          type: 'is-primary',
          position: 'is-top',
          duration: 500
        });
      }
    },
    handleNewComment(comment) {
      if (!comment) return;
      if (!this.feedback.replies) {
        const replies = [comment];
        this.$set(this.feedback, 'replies', replies);
      } else {
        const { replies } = this.feedback;
        replies.push(comment);
        this.$set(this.feedback, 'replies', replies);
      }
    },
    editFeedback() {
      this.editMode = true;
    },
    deleteFeedback() {
      this.$dialog.confirm({
        title: 'Deleting feedback',
        message:
          'Are you sure you want to <b>delete</b> your feedback? This action cannot be undone.',
        confirmText: 'Delete Feedback',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await FeedbackAPI.remove(this.feedback.id);
          this.$toast.open({
            message: 'Feedback deleted successfully.',
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
.feedback-creater {
  cursor: pointer;
}
.feedback-creater:hover {
  color: #593c79;
}
</style>

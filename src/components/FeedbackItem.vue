<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img class="is-rounded" src v-img-fallback="'/user-placeholder.png'">
      </p>
    </figure>
    <div class="media-content">
      <div class="content" v-if="!editMode">
        <div class="columns">
          <div class="column">
            <p>
              <strong
                v-if="feedback.createdBy"
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
                  class="has-text-link pointer"
                  @click="editFeedback()"
                >EDIT</small>
                &nbsp;&nbsp;
                <small
                  class="has-text-danger pointer"
                  @click="deleteFeedback()"
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
                <b-tooltip label="Down Vote" position="is-bottom" type="is-dark">
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
        <feedback-edit :feedback-id="feedback.id" :body="feedback.body"/>
      </div>
      <comment-item v-for="(comment, i) in feedback.replies" :key="i" :comment="comment"/>
      <comment-input @success="handleNewComment($event)" :feedback-id="feedback.id"/>
    </div>
  </article>
</template>
<script>
import CommentItem from './CommentItem.vue';
import CommentInput from './CommentInput.vue';
import FeedbackEdit from './FeedbackEdit.vue';
import { FeedbackAPI, FeedbackVoteAPI } from '@/api/api.index';

export default {
  name: 'FeedbackItem',
  components: {
    CommentItem,
    CommentInput,
    FeedbackEdit
  },
  props: {
    feedback: {
      type: [Object],
      default: () => ({})
    }
  },
  data() {
    return {
      editMode: false
    };
  },
  methods: {
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
        this.feedback.upVote = result.upVote;
        this.feedback.downVote = result.downVote;
        this.feedback.voted = result.voted;
      }
      this.$toast.open({
        message: vote === 1 ? 'Up votted' : 'Down votted',
        type: 'is-primary',
        position: 'is-top'
      });
    },
    handleNewComment(comment) {
      if (!comment || !this.feedback.replies) return;
      this.feedback.replies.push(comment);
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
          await FeedbackAPI.remove({
            feedbackId: this.feedback.id
          });
          this.$toast.open({
            message: 'Feedback deleted successfully.',
            type: 'is-success',
            position: 'is-top'
          });
        }
      });
    }
  }
};
</script>

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
              <div class="column" >
                    <p>
                    <strong> {{feedback.createdBy.title}} {{feedback.createdBy.fullName}}</strong>
                    <br>
                    {{feedback.body}}
                    <br>
                    <small>

                         <b-icon
                            icon="thumb-up"
                            type="is-primary"
                            size="is-small"
                        ></b-icon>
                        <small>203</small>
                        &nbsp;·&nbsp;
                         <b-icon
                            icon="thumb-down"
                            type="is-grey-lighter"
                            size="is-small"
                        ></b-icon>
                        <small>12</small>
                        &nbsp;·&nbsp;
                         {{feedback.createdAt | formatDate}}
                         &nbsp;&nbsp;
                        <small class="has-text-link pointer" @click="editFeedback()">EDIT</small>
                         &nbsp;&nbsp;
                        <small class="has-text-danger pointer" @click="deleteFeedback()">DELETE</small>
                    </small>
                    </p>
              </div>
               <div class="column is-narrow" style="align-items:center; display: flex;">
                <div class="is-block">
                    <div class="is-block  has-text-centered">

                    <b-tooltip label="Up Vote">
                        <b-icon
                            icon="thumb-up"
                            type="is-primary"
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
                            icon="thumb-down"
                            type="is-grey-lighter"
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
        <feedback-edit :feedback-id="feedback.id" :body="feedback.body" />
      </div>
      <comment-item v-for="(comment, i) in feedback.feedbackReplays" :key="i" :comment="comment"/>
      <comment-input :feedback-id="feedback.id"/>
    </div>
  </article>
</template>
<script>
import CommentItem from './CommentItem.vue';
import CommentInput from './CommentInput.vue';
import FeedbackEdit from './FeedbackEdit.vue';

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
    editFeedback() {
      this.editMode = true;
    },
    deleteFeedback() {

    }
  }
};
</script>

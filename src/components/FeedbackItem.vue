<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img class="is-rounded" src v-img-fallback="'/user-placeholder.png'">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
          <div class="columns">
              <div class="column">
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
      <comment-item v-for="(comment, i) in feedback.feedbackReplays" :key="i" :comment="comment"/>
      <comment-input :feedback-id="feedback.id"/>
    </div>
  </article>
</template>
<script>
import CommentItem from './CommentItem.vue';
import CommentInput from './CommentInput.vue';

export default {
  name: 'FeedbackItem',
  components: {
    CommentItem,
    CommentInput
  },
  props: {
    feedback: {
      type: [Object],
      default: () => ({})
    }
  },
  data() {
    return {};
  }
};
</script>

<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-48x48">
        <img class="is-rounded" src v-img-fallback="'/user-placeholder.png'">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{comment.createdById}}</strong>
          <br>
          {{comment.body}}
          <br>
          <small>{{comment.createdAt | formatDate}}</small>
        </p>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: 'FeedbackReplyItem',
  props: {
    comment: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
    return {};
  }
};
</script>

<template>
  <div>
    <div class="site-card pointer" @click="openDetail()">
      <div
        class="is-badge-primary is-badge-large"
        :class="{ badge: content.newFeedbacks>0 }"
        :data-badge="'+' + content.newFeedbacks"
      ></div>
      <div class="site-card-header is-marginless">
        <h3 class="card-title">{{content.title | limitTo(80, '...')}}</h3>
      </div>
      <div class="card-body">
        <p class="card-description">{{content.description | limitTo(120,'...')}}.</p>
        <div class="has-text-centered">
          <small>{{content.startDate | formatDate}}</small>
          -
          <small>{{content.endDate | formatDate}}</small>
        </div>
      </div>
      <div class="level">
        <div class="level-item"></div>
        <div class="level-item"></div>
        <div class="level-item"></div>
      </div>
      <div class="site-card-footer level">
        <div class="level-item">
          <b-icon icon="thumb-up post-upvote" type="is-primary" size="is-small"></b-icon>&nbsp;
          <span
            class="site-card-footer-item"
          >{{(content.upVote - content.downVote) | formatVote}}</span>
          &nbsp;
          <b-icon icon="thumb-down post-downvote" type="is-grey-lighter" size="is-small"></b-icon>
        </div>
        <div class="level-item">
          <b-icon icon="message numberofcomments" type="is-success" size="is-small"></b-icon>
          <span class="site-card-footer-item">{{content.numberOfFeedbacks}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: 'AgendaItem',
  props: {
    content: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    openDetail() {
      this.$router.push({
        name: 'agenda-detail',
        params: { id: this.content.id }
      });
    }
  }
};
</script>
<style>
.site-card {
  padding: 0 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  background: #fff;
  border-radius: 3px;
}
.card:hover {
  box-shadow: 0 6px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.site-card-header {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
.avatar {
  width: 25px;
  vertical-align: middle;
}
.avatar-content {
  margin-left: 1em;
  display: inline-grid;
}
.header-text {
  font-size: 12px;
  color: #778;
}
.card-body {
  padding-top: 0.5em;
  padding-bottom: 0em;
}
.card-title {
  font-size: 14px;
  color: #000;
  /* margin: 0 !important; */
}
.card-description {
  font-size: 12px;
  color: #aaa;
}
.card-description-dark {
  font-size: 12px;
  color: #555;
}
.site-card-footer {
  padding: 0 5px;
  padding-bottom: 10px;
}
.site-card-footer-item {
  font-size: 12;
  color: #aaa;
}
.has-text-centered {
  color: #593c79;
  padding-top: 15px;
}
.card-description {
  color: #8c8990;
  font-size: 14px;
}
.post-downvote,
.post-upvote,
.numberofcomments {
  color: #8c8990 !important;
  cursor: default;
}
</style>

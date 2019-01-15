<template>
    <div class="subtopic-card" @click="openDetail()">
        <b-tooltip :label="`${content.newFeedbacks} new feedbacks`" position="is-top" class="tooltip-new-feedback">
            <div
            class="is-badge-primary is-badge-small subtopic-badge"
            :class="{ badge: content.newFeedbacks > 0 }"
            :data-badge="'+' + content.newFeedbacks"
            ></div>
        </b-tooltip>
        <p class="subtopic-header">
            <b-tag
                type="is-black"
                v-bind:style="[{background: content.category.color }]"
                class="subtopic-tag"
            >{{ content.category.name }}</b-tag>
            <span style="float:right">
              <span class="post-creater" >{{content.createdBy.fullName }}</span>            
            </span>
        </p>
        <span class="subtopic-title">{{ content.title }}</span>
            <div class="has-text-right">
            <small>{{content.startDate | formatDate}}</small>
            -
            <small>{{content.endDate | formatDate}}</small>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  name: 'SubTopic',
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
    },
    openProfile(id) {
      this.$router.push({ name: 'profile', query: { userAccountId: id } });
    }
  }
};
</script>
<style>

.has-text-right {
  color: #555;
  padding: 0px !important;
  font-size: 14px !important;
}
.post-creater {
  color: #593c79;
  font-size: 14px;
}
.tooltip-new-feedback {
  display: inherit;
}
.add-new, .subtobic-add-icon{
  color: #6b808c;
  font-size: 14px;
}
.subtobic-add-icon {
  color:  #17394d;
}
.add-new:hover {
  text-decoration: underline;
  color:  #17394d;
}
.agenda-item {
  background: #dfe3e6;
}
.subtopic-footer {
  padding: 0 !important;
}
.subtopic-header {
  margin-top: 10px !important;
}
.subtopic-badge {
  float: left !important;
}
.subtopic-title {
  color: #17394d;
  font-size: 14px;
  font-weight: 400;
}
.agenda-title {
  font-weight: 600;
}
.subtopic-card {
  background-color: #eee;
  border-radius: 3px;
  box-shadow: 0 0 7px 0 rgb(0,0,0,0.5); 
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 7px;
  transition: 0.3s;
}
.subtopic-card:hover{
  background: #ddd;
  box-shadow: 0 2px 10px 0 rgb(0,0,0,0.5); 
   transition: 0.3s;
}
.subtopic-tag {
  height: 18px !important;
}
</style>

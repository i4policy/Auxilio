<template>
  <div>
    <div class="agenda-item site-card pointer">
      <div class="site-card-header agenda-item-header is-marginless">
        <div>
            <span class="post-creater" @click.stop="openProfile(content.createdBy.id)">
            {{content.createdBy.fullName}}
          </span>
          <h3 class="card-title agenda-title">{{content.title | limitTo(80, '...')}}</h3>
        </div>
         <span  @click.stop="deleteTopic(content.id)">
            <b-tooltip class="delete-tooltip" label="Delete Topic" position="is-bottom">
              <b-icon
                icon="close" class="delete-agenda" type="is-secondary" position="is-bottom"
                size="is-small"
              ></b-icon>
            </b-tooltip>
          </span>

      </div>
      <div v-if="subTopicList && subTopicList.length > 0" class="card-body">
        <div
          v-for="(subTopic, i) in subTopicList"
          :key="i"
        >
          <sub-topic-item :content="subTopic"></sub-topic-item>
        </div>
        <!-- <p class="card-description">{{content.description | limitTo(120,'...')}}.</p> -->
      </div>
      <div v-if="viewMore" class="card-links has-text-right" @click="viewMoreSubTopics()"><span> View more &rarr;</span></div>
      <div v-if="!viewMore && content.subTopics.rows.length > 4" class="card-links has-text-right" @click="viewLessSubTopics()"><span> View less &rarr;</span></div>
      <div class="site-card-footer level subtopic-footer">
        <div class="subtopic-add" @click="openNewSubTopic()">
          <a class="open-card-composer js-open-card-composer" href="#">
            <span><b-icon icon="plus" class="subtopic-add-icon" size="is-small"></b-icon></span>
            <span class="add-new">Add another sub topic</span>
          </a>
        </div>
      </div>
      <!-- <div class="site-card-footer level">
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
      </div> -->
    </div>
  </div>
</template>
<script>
import SubTopicItem from './SubTopicItem.vue';
import NewTopic from './NewTopic.vue';
import { AgendaAPI } from '@/api';
import ConfirmationDialog from '../shared/components/ConfirmationDialog.vue';

export default {
  components: {
    SubTopicItem
  },
  name: 'AgendaItem',
  props: {
    content: {
      type: [Object],
      default: () => {}
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    subTopicList() {
      return this.content.subTopics.rows;
    },
    viewMore() {
      return this.content.subTopics.rows.length < this.content.subTopics.count;
    }
  },
  methods: {
    openNewSubTopic() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        props: { mainTopicId: this.content.id },
        events: {
          close: async (data) => {
            if (data) {
              if (this.content.subTopics.rows.length > 4) {
                await this.getSubTopics();
              } else {
                await this.getSubTopics({ mainTopicId: this.content.id }, 4);
              }
            }
          }
        },
        component: NewTopic,
        hasModalCard: true
      });
    },
    async viewMoreSubTopics() {
      await this.getSubTopics();
      this.isLoading = false;
    },
    async viewLessSubTopics() {
      await this.getSubTopics({ mainTopicId: this.content.id }, 4);
      this.isLoading = false;
    },
    async getSubTopics(filter = { mainTopicId: this.content.id }, limit) {
      this.isLoading = true;
      const subTopics = await AgendaAPI.allSubTopics(filter, limit);
      this.content.subTopics.rows = subTopics.rows;
      this.content.subTopics.count = subTopics.count;
    },
    openProfile(id) {
      this.$router.push({ name: 'profile', query: { userAccountId: id } });
    },
    deleteTopic(id) {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        events: {
          close: async (data) => {
            if (data) {
              this.$emit('onDelete', id);
            }
          }
        },
        component: ConfirmationDialog,
        hasModalCard: true
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
  background: rgb(224, 217, 217);
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
.has-text-right {
  color: #555;
  padding: 0px !important;
  font-size: 14px !important;
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
.post-creater {
  color: #593c79;
  font-size: 14px;
}
.agenda-item {
  min-height: 150px;
  max-height: 640px;
  overflow-y: scroll;
  width: 270px;
}
.delete-agenda:hover {
  color: #ed0083;
  font-weight: bold;
}
.delete-agenda{
  font-size: 16px;
  margin-left: 100px;
  color: #593c79;
  font-weight: 600;
}
.agenda-item-header {
  position: relative;
}
.delete-tooltip {
  position: relative;
  bottom: 50px;
  left: 90px;
}
.subtopic-footer {
  padding-bottom: 10px !important;
}
</style>

<template>
  <div>
    <div class="agenda-item site-card pointer" :id="`topic-${content.id}`">

      <div class="site-card-header agenda-item-header is-marginless">
        <div>
            <span v-if="content.createdBy" class="post-creater" @click.stop="openProfile(content.createdBy.id)">
            {{`${content.createdBy.givenName} ${content.createdBy.familyName}`}}
            </span>
         <div class="delete-container has-text-right" @click.stop="deleteTopic(content.id)">
            <b-tooltip class="delete-tooltip" label="Delete Topic" position="is-bottom">
              <b-icon
                icon="close" class="delete-agenda" type="is-secondary" position="is-bottom"
                size="is-small"
              ></b-icon>
            </b-tooltip>
          </div>
          <h3 class="card-title agenda-title">{{content.title | limitTo(descriptionLimit, '...')}}</h3>
          <h3 v-html="this.$options.filters.limitTo(content.description, descriptionLimit, '...')" class="card-title agenda-description"></h3>
          <a class="card-title more-description card-links" v-if="content.description && content.description.length > descriptionLimit" @click="moreDescription(content.description)">Read More </a>
          <a class="card-title more-description card-links" v-if="content.description && content.description.length === descriptionLimit" @click="lessDescription()">Read Less </a>
          <!-- <div class="delete-container has-text-right" @click.stop="openInvitation(content.id)">
            <b-tooltip class="delete-tooltip" label="Invite users" position="is-bottom">
              <b-icon
                icon="plus" class="delete-agenda" type="is-secondary" position="is-bottom"
                size="is-small"
              ></b-icon>
            </b-tooltip>
          </div> -->
          <div class="columns">
            <div class="column is-12">
              <div
                v-for="(user, i) in content.participatedUsers"
                v-if="i <= 5"
                v-popover="{ name: `popover-${content.id}-${content.participatedUsers[i].id}` }"
                :key="i"
                class="member js-member">
                <span class="member-initials" :title="`${user.givenName} ${user.familyName}`">{{ `${user.givenName} ${user.familyName}`| formatName }}</span>
                <!-- <span v-if="user.isAdmin" class="member-type admin" title="This member is an admin of this topic."></span> -->
                <popover :name="`popover-${content.id}-${content.participatedUsers[i].id}`">
                  <div>
                    <div class="board-member-menu">
                      <div class="mini-profile">
                        <div class="mini-profile-member member-large">
                          <span class="member-initials" title="tsadkan yitbarek (tsadkanyitbarek1)">
                            <user-avatar class="avatar-profile" :size="30" :file-name="content.participatedUsers[i].profilePicture"/>
                          </span>
                        </div>
                        <div class="mini-profile-info">
                          <h3 class="mini-profile-info-title">
                            <a class="mini-profile-info-title-link js-profile" @click.stop="openProfile(content.participatedUsers[i].id)" href="#">${content.participatedUsers[i].givenName} ${content.participatedUsers[i].familyName}`}}</a>
                          </h3>
                          <p class="quiet u-bottom">{{content.participatedUsers[i].email}}</p>
                          <p class="quiet u-bottom">{{content.participatedUsers[i].phoneNumber}}</p>
                          <p v-if="content.participatedUsers[i].isActive" class="u-bottom">
                          <router-link :to="{name:'update-profile'}">
                            <a class="quiet js-edit-profile" href="#">Edit profile info</a>
                          </router-link>
                          </p>
                        </div>
                      </div>
                      <ul class="pop-over-list">
                        <li><a class="js-remove-member" href="#" @click.stop="openProfile(content.participatedUsers[i].id)" >View Member’s Activity</a></li>
                        <!-- <li v-if="content.participatedUsers[i].isActive" @click="leaveTopic(content.id, content.participatedUsers[i].id, i, content.participatedUsers[i].isActive)"><a class="js-remove-member">Leave Topic</a></li> -->
                        <!-- <li v-if="!content.participatedUsers[i].isActive" @click="leaveTopic(content.id, content.participatedUsers[i].id, i, content.participatedUsers[i].isActive)"><a class="js-remove-member">Remove from Topic…</a></li> -->
                      </ul>
                    </div>
                  </div>
                  </popover>


              </div>
              <div
                class="more-member member js-member"
                v-if="content.participatedUsers.length > 1"
                v-popover="{ name: `popover-${content.id}-more` }"
                >
                <span class="member-initials" title="see all">{{ content.participatedUsers.length }}</span>
                  <popover :name="`popover-${content.id}-more`">
                    <div class="popover-container">
                      <div class="popover-header">
                        <span class="popover-title">Topic Members</span>
                      </div>
                      <!-- <h6 class="members">MEMBERS</h6>
                      <div class="users-avatar">
                        <div
                          v-if="user.isConfirmed"
                          v-for="(user, i) in content.participatedUsers"
                          v-popover="{ name: `popover-${content.id}-${content.participatedUsers[i].id}` }"
                          :key="i"
                          class="member js-member">
                          <span  class="member-initials" :title="`${user.givenName} ${user.familyName}`">{{ `${user.givenName} ${user.familyName}` | formatName }}</span>
                          <span v-if="user.isAdmin" class="member-type admin" title="This member is an admin of this topic."></span>
                        </div>
                      </div> -->

                      <div
                        v-for="(user, i) in content.participatedUsers"
                        v-popover="{ name: `popover-${content.id}-${content.participatedUsers[i].id}` }"
                        :key="i"
                        class="member js-member">
                        <span class="member-initials" :title="`${user.givenName} ${user.familyName}`">{{ `${user.givenName} ${user.familyName}` | formatName }}</span>
                      </div>
                    </div>
                  </popover>
            </div>

            </div>
          </div>
          <div class="agenda-status level">
            <div class="level-item">
              <b-icon icon="thumb-up post-upvote" type="is-primary" size="is-small"></b-icon>&nbsp;
              <span
                class="site-card-footer-item"
              >{{(content.upVote - content.downVote) | formatVote}}</span>
              &nbsp;
              <b-icon icon="thumb-down post-downvote" type="is-grey-lighter" size="is-small"></b-icon>
            </div>
            <div class="level-item">
              <b-icon icon="book numberofcomments" type="is-success" size="is-small"></b-icon>
              <span class="site-card-footer-item">{{content.numberOfSubTopics}}</span>
            </div>
            <div class="level-item">
              <b-icon icon="message numberofcomments" type="is-success" size="is-small"></b-icon>
              <span class="site-card-footer-item">{{content.numberOfFeedbacks}}</span>
            </div>
          </div>
        </div>
        <!-- <div class="column is-narrow has-text-centered" v-if="this.content.subTopics.categoryList.length > 0">
          <b-tag
            type="is-white"
            class="categories"
            @click.native="filterByAll()"
          >All</b-tag>
          <b-tag
            class="categories"
            v-for="(category, i) in this.content.subTopics.categoryList"
            :key="i"
            @click.native="filterByCategory(category.id)"
            v-bind:style="[{background: category.color }]"
          >{{category.name}}</b-tag>
        </div> -->
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
    </div>
  </div>
</template>
<script>
import SubTopicItem from './SubTopicItem.vue';
import NewTopic from './NewTopic.vue';
import Invitation from './Invitation.vue';
import { AgendaAPI } from '@/api';
import ConfirmationDialog from '../shared/components/ConfirmationDialog.vue';
import UserAvatar from './UserAvatar.vue';
import { AuthService } from '@/services';

export default {
  components: {
    SubTopicItem,
    UserAvatar
  },
  name: 'AgendaItem',
  props: {
    content: {
      type: [Object],
      default: () => {}
    },
  },
  data() {
    return {
      isLoading: false,
      descriptionLimit: 80
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
    openInvitation() {
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
        component: Invitation,
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
    },
    async filterByCategory(categoryId) {
      if (categoryId) {
        await this.getSubTopics({ categoryId, mainTopicId: this.content.id });
      }
    },
    async filterByAll() {
      await this.getSubTopics();
    },
    isOwner(userId) {
      return AuthService.getProfile().id === userId;
    },
    async leaveTopic(mainTopicId, userId, userIndex, isActive) {
      await AgendaAPI.leaveTopic({ mainTopicId, userId });
      this.content.participatedUsers.splice(userIndex, 1);
      if (isActive) {
        this.$emit('onLeave');
      }
      this.$toast.open({
        message: 'User Removed.',
        type: 'is-success',
        position: 'is-top',
        duration: 1000
      });
    },
    moreDescription(description) {
      this.descriptionLimit = description.length;
    },
    lessDescription() {
      this.descriptionLimit = 80;
    }
  }
};
</script>
<style>
.site-card {
  padding: 0px 5px 0px 15px;
  margin-bottom: 15px;
  box-shadow: 0 5px 5px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  background: #fff;
  border-radius: 3px;
}
.card:hover {
  box-shadow: 0 6px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.site-card-header {
  border-bottom: 1px solid #ddd;
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
  width: 270px;
}
.agenda-title {
  font-size: 16px;
}
.agenda-description {
  color: #666;
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
.delete-container {
  position: relative;
  right: 10px;
  float: right !important;
}
.agenda-comments {
  position: relative;
  right: 10px;
  float: right !important;
}
.subtopic-footer {
  padding-bottom: 10px !important;
}
.agenda-status {
  margin-top: 10px;
}
.categories {
  margin-right: 10px !important;
}

.member {
  height: 28px;
  width: 28px;
  margin: 0 0 0 -2px;
  z-index: 1;
  background-color: #dfe3e6 !important;
  border-radius: 25em;
  color: #17394d;
  cursor: pointer;
  display: block;
  float: left;
  overflow: visible;
  position: relative;
}
.member-initials {
  height: 28px;
  line-height: 28px;
  width: 28px;
  display: block;
  font-size: 12px;
  font-weight: 700;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: 0;
  color: #17394d;
  cursor: pointer;
}
.admin {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAYFBMVEX////o6O8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo6O/o6O/o6O96en7o6O+Li4/o6O+7u8HMzNLT09no6O/f3+bo6O/j4+ro6O/d3eqBgcW6utxfX7dqarxISK4yMqVTjb2aAAAAGHRSTlMAEBMYKzU6REhNUGBweoCFoLLI0+Dp8PU7BNTwAAAAh0lEQVR4XpWN2xKCMAxEA6JyEQWtsC0X//8vTdjMdMY3z9PmNOmKUdwDlHArxGknOFNLM5hY1nUxObhBTB8lRbrOVnad1e622ElA5MCHiCDAxhOeb4CqxI9ZkkwZuRFUuTGr3Ej124j/Gl99/wSRcQYwj43yeB9RGnIpy7NHqWoNdSXK6XrELyGLGov1L1adAAAAAElFTkSuQmCC);
  background-size: 100%;
  bottom: 0;
  height: 9px;
  position: absolute;
  right: 1px;
  width: 9px;
  z-index: 3;
}
.more-member {
  background: #62447e4d;
}
.vue-popover {
  top: 30px !important;
  left: 0px !important;
  width: 285px !important;
}
.mini-profile {
  margin: 8px 0;
  min-height: 56px;
  position: relative;
}
.mini-profile-member {
  float: left;
  margin: 2px;
}
.mini-profile-info {
  margin: 0 0 0 40px;
  word-wrap: break-word;
}
.mini-profile-info-title {
  margin: 0 40px 0 0;
}
.mini-profile-info-title-link {
  text-decoration: none;
  color: #593c79;
}
.quiet, .quiet a {
    color: #6b808c;
}
.u-bottom {

    margin-bottom: 0;
    padding-bottom: 0;
    font-size: 14px;
    color: #333 !important;
}
.u-bottom a {
  color: #6b808c;
}

.u-bottom a:hover{
  text-decoration: underline;
}
ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.pop-over-list li > a {
    cursor: pointer;
    display: block;
    font-weight: 700;
    padding: 6px 12px;
    position: relative;
    text-decoration: none;
    font-size: 14px
}
.pop-over-list li > a.disabled {
    color: #6b808c;
    cursor: default;
}
.pop-over-list li > a.disabled:hover {
    background: none;
}

.pop-over-list li > a:hover {
    background-color: #ed0083;
    color: #fff;
}
.pop-over-list li > a {
      color: #ed0083;
}
.users-avatar {
  width: 100%;
  float: left;
  padding: 0px 0px 10px 0px;
}
.popover-container {
  padding: 10px;
}

.popover-container .members {
  font-size: 14px;
  padding-bottom: 10px !important;
}

.popover-container .invited {
  font-size: 14px;
  padding: 10px 0px 0px 0px!important;
  margin-bottom: 10px;
}
.popover-title {
  box-sizing: border-box;
  color: #6b808c;
  display: block;
  line-height: 40px;
  border-bottom: 1px solid rgba(9,45,66,.13);
  margin: 0 12px;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
}
.popover-header {
  height: 40px;
  position: relative;
  margin-bottom: 8px;
  text-align: center;
  background: transparent;
}
.more-description:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <a
          v-if="isOwner || !userAccountId"
          class="button is-primary is-outlined"
          href="#"
          id="edit-preferences"
          style="margin: 5px 0"
          @click="openFeedbackReport()"
        >System Feedback</a>
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <span class="header-icon user-profile-image">
              <user-avatar
                class="avatar-profile"
                :bucket="bucket"
                :size="80"
                :file-name="profile.profilePicture"
                :isRounded="false"
              />
            </span>
          </div>
          <div class="column is-3-tablet is-10-mobile name">
            <p>
              <span class="title is-bold">{{ `${profile.givenName} ${profile.familyName}` }}</span>
              <br>
              <router-link
                v-if="!this.userAccountId || isOwner"
                tag="a"
                :to="{name:'update-profile'}"
              >
                <a
                  class="button is-primary is-outlined"
                  href="#"
                  id="edit-preferences"
                  style="margin: 5px 0"
                >Edit Profile</a>
              </router-link>
              <br>
            </p>
            <p class="tagline">
              <span v-if="profile.country">{{ profile.country }}</span>
              <br>
              {{ profile.organization }}
              <br>
              {{ profile.email }}
              <br>
              {{ profile.phoneNumber}}
            </p>
          </div>
          <div class="column is-1-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{ myStatus.agendas.count }}</p>
            <p class="stat-key">agendas</p>
          </div>
          <div class="column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{ myStatus.posts.count }}</p>
            <p class="stat-key">subtopics</p>
          </div>
          <div class="column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{ myStatus.feedbacks.count }}</p>
            <p class="stat-key">comments</p>
          </div>
          <div class="column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{{ myStatus.replies.count }}</p>
            <p class="stat-key">replies</p>
          </div>
        </div>
      </div>
      <div class="profile-options is-fullwidth">
        <b-tabs size="is-medium" position="is-centered" class="block">
          <b-tab-item label="Agendas" icon="book">
            <span
              v-if="!myStatus.agendas.rows.length > 0"
              class="has-text-centered not-found"
            >No agenda found</span>
            <div
              class="card-links list-link"
              v-for="(agenda, i) in myStatus.agendas.rows"
              :key="agenda.id"
              @click="$router.push({name: 'agendas',params: { id: agenda.id }});"
            >
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">{{ agenda.title | limitTo(30, '...')}}</p>

                  <!-- <div class="card-header-icon delete-container has-text-right">
                    <b-tag
                        type="is-black"
                        v-bind:style="[{background: agenda.category.color }]"
                        class="subtopic-tag"
                    >{{ agenda.category.name }}</b-tag>
                  </div>-->
                </header>
                <div class="card-content">
                  <div class="content">
                    <span v-html="agenda.description"></span>
                    <br>
                    <time datetime="2016-1-1">{{ agenda.createdAt | formatDate }}</time>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!viewLessAgendas && (myStatus.agendas.count > 5)"
              class="card-links"
              @click="viewMoreAgendas()"
            >
              <span>View more &rarr;</span>
            </div>
            <div v-if="viewLessAgendas" class="card-links" @click="getMyAgendas()">
              <span>View less &rarr;</span>
            </div>
          </b-tab-item>
          <b-tab-item label="Subtopics" icon="book">
            <span
              v-if="!myStatus.posts.rows.length > 0"
              class="has-text-centered not-found"
            >No suptopic found</span>
            <div
              class="card-links list-link"
              v-for="(post, i) in myStatus.posts.rows"
              :key="post.id"
              @click="$router.push({name: 'agenda-detail',params: { id: post.id }});"
            >
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">{{ post.title | limitTo(30, '...')}}</p>

                  <div class="card-header-icon delete-container has-text-right">
                    <b-tag
                      type="is-black"
                      v-bind:style="[{background: post.category.color }]"
                      class="subtopic-tag"
                    >{{ post.category.name }}</b-tag>
                  </div>
                </header>
                <div class="card-content">
                  <div class="content">
                    <span v-html="post.description"></span>
                    <br>
                    <time datetime="2016-1-1">{{ post.createdAt | formatDate }}</time>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!viewLessPosts && (myStatus.posts.count > 5)"
              class="card-links"
              @click="viewMorePosts()"
            >
              <span>View more &rarr;</span>
            </div>
            <div v-if="viewLessPosts" class="card-links" @click="getMyPosts()">
              <span>View less &rarr;</span>
            </div>
          </b-tab-item>
          <b-tab-item label="Comments" icon="comment">
            <span
              v-if="!myStatus.feedbacks.rows.length > 0"
              class="has-text-centered not-found"
            >No comment found.</span>
            <div
              class="card-links list-link"
              v-for="(feedback) in myStatus.feedbacks.rows"
              :key="feedback.id"
              @click="$router.push({name: 'agenda-detail',params: { id: feedback.postId }, query: {scrollTarget: `target-${feedback.id}`}});"
            >
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    {{ feedback.body | limitTo(30, '...')}}
                    <br>
                    <time datetime="2016-1-1">{{ feedback.createdAt | formatDate }}</time>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!viewLessFeedbacks && myStatus.feedbacks.count > 5"
              class="card-links"
              @click="viewMoreFeedbacks()"
            >
              <span>View more &rarr;</span>
            </div>
            <div v-if="viewLessFeedbacks" class="card-links" @click="getMyFeedbacks()">
              <span>View less &rarr;</span>
            </div>
          </b-tab-item>
          <b-tab-item label="Replies" icon="reply">
            <span
              v-if="!myStatus.replies.rows.length > 0"
              class="has-text-centered not-found"
            >No reply found.</span>
            <div
              class="card-links list-link"
              v-for="(reply) in myStatus.replies.rows"
              :key="reply.id"
              @click="$router.push({name: 'agenda-detail',params: { id: reply.postId }, query: {scrollTarget: `target-${reply.id}`}});"
            >
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    {{ reply.body | limitTo(30, '...')}}
                    <br>
                    <time datetime="2016-1-1">{{ reply.createdAt | formatDate }}</time>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!viewLessReplies && myStatus.replies.count > 5"
              class="card-links"
              @click="viewMoreReplies()"
            >
              <span>View more &rarr;</span>
            </div>
            <div v-if="viewLessReplies" class="card-links" @click="getMyReplies()">
              <span>View less &rarr;</span>
            </div>
          </b-tab-item>
          <b-tab-item label="Feedbacks" icon="note">
            <span
              v-if="!myStatus.systemFeedbacks.rows.length > 0"
              class="has-text-centered not-found"
            >No feedback found.</span>

            <div
              class="card-links list-link"
              v-for="(feedback, i) in myStatus.systemFeedbacks.rows"
              :key="feedback.id"
            >
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">{{ feedback.subject | limitTo(30, '...')}}</p>

                  <div
                    class="card-header-icon delete-container has-text-right"
                    @click.stop="deleteFeedback(feedback.id, i)"
                  >
                    <b-tooltip class="delete-tooltip" label="Delete Feedback" position="is-bottom">
                      <b-icon
                        icon="close"
                        class="delete-agenda"
                        type="is-secondary"
                        position="is-bottom"
                        size="is-small"
                      ></b-icon>
                    </b-tooltip>
                  </div>
                </header>
                <div class="card-content">
                  <div class="content">
                    {{ feedback.description }}
                    <br>
                    <time datetime="2016-1-1">{{ feedback.createdAt | formatDate }}</time>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import UserAvatar from './UserAvatar.vue';
import { UserAccountAPI } from '@/api';
import { AuthService } from '@/services';
import FeedbackReport from './FeedbackReport.vue';
import ConfirmationDialog from '../shared/components/ConfirmationDialog.vue';

export default {
  name: 'MyProfile',
  components: {
    UserAvatar
  },
  data() {
    return {
      profile: {},
      myStatus: {
        posts: {
          rows: [],
          count: 0
        },
        feedbacks: {
          rows: [],
          count: 0
        },
        replies: {
          rows: [],
          count: 0
        },
        systemFeedbacks: {
          rows: [],
          count: 0
        }
      },
      userAccountId: null,
      bucket: 'users',
      viewLessPosts: false,
      viewLessAgendas: false,
      viewLessFeedbacks: false,
      viewLessReplies: false
    };
  },
  created() {
    if (this.$route.query.userAccountId) {
      this.userAccountId = this.$route.query.userAccountId;
    }
    this.getProfile();
    this.getMyStatus();
  },
  methods: {
    async getProfile() {
      this.profile = await UserAccountAPI.getProfile(this.userAccountId);
    },
    async getMyStatus() {
      this.myStatus = await UserAccountAPI.getMyStatus(
        this.userAccountId,
        5,
        0
      );
    },
    async getMyPosts() {
      this.myStatus.posts = await UserAccountAPI.getMyPosts(
        5,
        0,
        this.userAccountId
      );
      this.viewLessPosts = false;
    },
    async getMyAgendas() {
      this.myStatus.agendas = await UserAccountAPI.getMyAgendas(
        5,
        0,
        this.userAccountId
      );
      this.viewLessAgendas = false;
    },
    async getMyFeedbacks() {
      this.myStatus.feedbacks = await UserAccountAPI.getMyFeedbacks(
        5,
        0,
        this.userAccountId
      );
      this.viewLessFeedbacks = false;
    },
    async getMyReplies() {
      this.myStatus.replies = await UserAccountAPI.getMyReplies(
        5,
        0,
        this.userAccountId
      );
      this.viewLessReplies = false;
    },

    async getMySystemFeedbacks() {
      this.myStatus.systemFeedbacks = await UserAccountAPI.getMySystemFeedbacks(
        this.myStatus.systemFeedbacks.count,
        0,
        this.userAccountId
      );
    },
    async viewMorePosts() {
      this.myStatus.posts = await UserAccountAPI.getMyPosts(
        this.myStatus.posts.count,
        0,
        this.userAccountId
      );
      this.viewLessPosts = true;
    },
    async viewMoreAgendas() {
      this.myStatus.agendas = await UserAccountAPI.getMyAgendas(
        this.myStatus.agendas.count,
        0,
        this.userAccountId
      );
      this.viewLessAgendas = true;
    },
    async viewMoreFeedbacks() {
      this.myStatus.feedbacks = await UserAccountAPI.getMyFeedbacks(
        this.myStatus.count,
        0,
        this.userAccountId
      );
      this.viewLessFeedbacks = true;
    },
    async viewMoreReplies() {
      this.myStatus.replies = await UserAccountAPI.getMyReplies(
        this.myStatus.replies.count,
        0,
        this.userAccountId
      );
      this.viewLessReplies = true;
    },
    openFeedbackReport() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        props: {},
        events: {
          close: async (data) => {
            this.myStatus.systemFeedbacks.rows.push(data);
          }
        },
        component: FeedbackReport,
        hasModalCard: true
      });
    },
    deleteFeedback(id, index) {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        events: {
          close: async (data) => {
            if (data) {
              await UserAccountAPI.deleteSystemFeedback(id);
              this.myStatus.systemFeedbacks.rows.splice(index, 1);
              this.$toast.open({
                message: 'Feedback Removed.',
                type: 'is-success',
                position: 'is-top',
                duration: 1000
              });
            }
          }
        },
        component: ConfirmationDialog,
        hasModalCard: true
      });
    }
  },
  computed: {
    isOwner() {
      return AuthService.getProfile().id === this.userAccountId;
    }
  }
};
</script>
<style scooped>
.site-body {
  margin-top: 2em;
}

.avatar-big {
  width: 100px;
  /* margin-top: -5.5em; */
  margin-right: 1em;
}
.card-links {
  margin-bottom: 10px;
}
.card-links > i {
  background: #593c79;
  color: #fff;
}
.card-links > span {
  font-size: 16px;
  color: #555;
  cursor: pointer;
}
.card-links > span:hover {
  color: #333;
  border-bottom: 1px solid #333;
}
.edit-profile {
  margin-left: 200px;
  font-size: 15px;
  color: #593c79;
  position: relative;
  right: 100px;
  top: 25px;
}
.image-avatar {
  margin-right: 20px;
  margin-top: 30px;
}
.profile-header {
  font-size: 18px !important;
  font-weight: 600;
}
.list-link span {
  color: #593c79 !important;
  cursor: pointer !important;
}
.header-text {
  font-size: 16px;
}
.profile-card {
  background: #ddd;
  margin-right: 0em !important;
}
.profile-title {
  font-size: 18px !important;
  color: #444;
  font-weight: 600;
}
.profile-text {
  color: #444 !important;
}
.profile {
  background: #f5f7fa;
  margin-top: 30px !important;
  border-radius: 10px;
}

.stat-val {
  font-size: 2em;
  padding-top: 20px;
  font-weight: bold;
}

.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}

.section.profile-heading
  .column.is-2-tablet.has-text-centered
  + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, 0.2);
}

.container.profile {
  margin-top: 1%;
}

.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}

.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada;
}

.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f1f1f1;
}
.avatar-profile image {
  border-radius: 0px !important;
}
.list-link .post-title {
  color: #000 !important;
  font-size: 18px;
}
.list-link .post-date {
  color: #6b808c !important;
}
.not-found {
  font-size: 20px !important;
  font-weight: 400 !important;
}
.tab-item {
  text-align: left !important;
}
.profile-heading > a {
  float: right;
}
time {
  font-size: 14px;
  color: #959595 !important;
}
.card {
  cursor: pointer;
}
.tag {
  color: #fff;
}
</style>

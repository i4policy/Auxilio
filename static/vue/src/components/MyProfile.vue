<template>
  <div class='columns'>
  <div class='container profile'>
    <div class='section profile-heading'>
      <div class='columns is-mobile is-multiline'>
        <div class='column is-1'>
          <span class='header-icon user-profile-image'>
            <user-avatar class="avatar-profile" :bucket="bucket" :size="80" :file-name="profile.profilePicture" :isRounded="false"/>
          </span>
        </div>
        <div class='column is-4-tablet is-10-mobile name'>
          <p>
            <span class='title is-bold'>{{ profile.fullName }}</span>
            <br>
            <router-link v-if="!this.userAccountId || isOwner" tag="a" :to="{name:'update-profile'}">
              <a class='button is-primary is-outlined' href='#' id='edit-preferences' style='margin: 5px 0'>
                Edit Profile
              </a>
            </router-link>
            <br>
          </p>
          <p class='tagline'>
            {{ profile.title }}
            <br>
            {{ profile.email }}
            <br>
            {{ profile.phoneNumber}}
          </p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>{{ posts.count }}</p>
          <p class='stat-key'>topics</p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>{{ feedbacks.count }}</p>
          <p class='stat-key'>comments</p>
        </div>
        <div class='column is-2-tablet is-4-mobile has-text-centered'>
          <p class='stat-val'>{{ replies.count }}</p>
          <p class='stat-key'>replies</p>
        </div>
      </div>
    </div>
    <div class='profile-options is-fullwidth'>

      <b-tabs size="is-large" position="is-centered" class="block">
          <b-tab-item label="My Topics" icon="document">
            <span v-if="!posts.rows.length > 0" class="has-text-centered not-found">
              No Topic found.
            </span>
            <div class="card-links list-link" v-for="(post, i) in posts.rows" :key="post.id" @click="$router.push({name: 'agenda-detail',params: { id: post.id }});">
              <!-- <i class="category-pill-small">3</i> -->
              <span class="post-title">
                {{i+1}}. {{ post.title | limitTo(30, '...')}}
              </span><br>
              <span class="post-date">
                {{ post.createdAt | formatDate }}
              </span>
            </div>
            <div v-if="!viewLessPosts && (posts.count > 5)" class="card-links" @click="viewMorePosts()"><span> View more &rarr;</span></div>
            <div v-if="viewLessPosts" class="card-links" @click="getMyPosts()"><span> View less &rarr;</span></div>
          </b-tab-item>
          <b-tab-item label="My Comments" icon="comment">
            <span v-if="!feedbacks.rows.length > 0" class="has-text-centered not-found">
              No comment found.
            </span>
                    <div class="card-links list-link" v-for="(feedback,i) in feedbacks.rows" :key="feedback.id" @click="$router.push({name: 'agenda-detail',params: { id: feedback.postId }, query: {scrollTarget: `target-${feedback.id}`}});">
                    <!-- <i class="category-pill-small">3</i> -->
                    <span class="post-title">
                      {{i+1}}. {{ feedback.body | limitTo(30, '...')}}
                    </span><br>
                    <span class="post-date">
                      {{ feedback.createdAt | formatDate }}
                    </span>
                  </div>
                  <div v-if="!viewLessFeedbacks && feedbacks.count > 5" class="card-links" @click="viewMoreFeedbacks()"><span> View more &rarr;</span></div>
                  <div v-if="viewLessFeedbacks" class="card-links" @click="getMyFeedbacks()"><span> View less &rarr;</span></div>
          </b-tab-item>
          <b-tab-item label="My Replies" icon="reply">
            <span v-if="!replies.rows.length > 0" class="has-text-centered not-found">
              No reply found.
            </span>
               <div class="card-links list-link" v-for="(reply, i) in replies.rows" :key="reply.id" @click="$router.push({name: 'agenda-detail',params: { id: reply.postId }, query: {scrollTarget: `target-${reply.id}`}});">
                    <!-- <i class="category-pill-small">3</i> -->
                    <span class="post-title">
                      {{i+1}}. {{ reply.body | limitTo(30, '...')}}
                    </span><br>
                    <span class="post-date">
                      {{ reply.createdAt | formatDate }}
                    </span>
                  </div>
                  <div v-if="!viewLessReplies && replies.count > 5" class="card-links" @click="viewMoreReplies()"><span> View more &rarr;</span></div>
                  <div v-if="viewLessReplies" class="card-links" @click="getMyReplies()"><span> View less &rarr;</span></div>
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

export default {
  name: 'MyProfile',
  components: {
    UserAvatar
  },
  data() {
    return {
      profile: {},
      posts: {
        rows: [],
        count: 0,
      },
      feedbacks: {
        rows: [],
        count: 0,
      },
      replies: {
        rows: [],
        count: 0,
      },
      userAccountId: null,
      bucket: 'users',
      viewLessPosts: false,
      viewLessFeedbacks: false,
      viewLessReplies: false
    };
  },
  created() {
    if (this.$route.query.userAccountId) {
      this.userAccountId = this.$route.query.userAccountId;
    }
    this.getProfile();
    setTimeout(() => {
      this.getMyFeedbacks();
    }, 500);
    setTimeout(() => {
      this.getMyReplies();
    }, 500);
    this.getMyPosts();
  },
  methods: {
    async getProfile() {
      this.profile = await UserAccountAPI.getProfile(this.userAccountId);
    },
    async getMyPosts() {
      this.posts = await UserAccountAPI.getMyPosts(5, 0, this.userAccountId);
      this.viewLessPosts = false;
    },
    async getMyFeedbacks() {
      this.feedbacks = await UserAccountAPI.getMyFeedbacks(5, 0, this.userAccountId);
      this.viewLessFeedbacks = false;
    },
    async getMyReplies() {
      this.replies = await UserAccountAPI.getMyReplies(5, 0, this.userAccountId);
      this.viewLessReplies = false;
    },
    async viewMorePosts() {
      this.posts = await UserAccountAPI.getMyPosts(this.posts.count, 0, this.userAccountId);
      this.viewLessPosts = true;
    },
    async viewMoreFeedbacks() {
      this.feedbacks = await UserAccountAPI.getMyFeedbacks(this.feedbacks.count, 0, this.userAccountId);
      this.viewLessFeedbacks = true;
    },
    async viewMoreReplies() {
      this.replies = await UserAccountAPI.getMyReplies(this.replies.count, 0, this.userAccountId);
      this.viewLessReplies = true;
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
.edit-profile{
  margin-left: 200px;
  font-size: 15px;
  color: #593c79;
  position: relative;
  right: 100px;
  top: 25px
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
  background: #F5F7FA;
  margin-top: 30px !important;
  border-radius: 10px;
}

.stat-val {
  font-size: 3em;
  padding-top: 20px;
  font-weight: bold;
}

.stat-key {
  font-size: 1.4em;
  font-weight: 200
}

.section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, .2);
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
  border-bottom: 1px solid #dadada
}

.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #F1F1F1;
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
  margin-left: 40% !important;
  font-size: 30px !important;
  font-weight : 400 !important;
}
.list-link {
  margin-left: 40% !important;
}
</style>

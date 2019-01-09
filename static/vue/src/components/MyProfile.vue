<template>
  <div>
    <div class="site-body">
      <div class="columns">
        <div class="column is-offset-1 is-10">
          <div class="site-card" style="padding-bottom: 1em;">
            <div class="site-card-header columns">
              <div class="column is-full">
                <user-avatar class="avatar-big" :bucket="bucket" :size="80" :file-name="userData.profile.profilePicture"/>
                <div class="avatar-content text-left" style="display:inline-block">
                  <div class="card-title bold">Profile</div>
                  <div class="header-text">
                    <router-link tag="a" :to="{name:'update-profile'}">
                      <b-tooltip label="Edit Profile">
                        <b-icon
                          icon="pencil" class="edit-profile" type="is-secondary"
                          size="is-small"
                        ></b-icon>
                      </b-tooltip>
                    </router-link>
                  </div>
                  <div class="header-text bold">{{ userData.profile.fullName }}</div>
                  <div class="header-text">{{ userData.profile.title }}</div>
                  <div class="header-text">{{ userData.profile.email }}</div>
                  <div class="header-text">{{ userData.profile.phoneNumber }}</div>

                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="columns">
                <div class="column is-12-mobile is-4-desktop">
                  <h3 class="card-title">Posts ({{ userData.posts.count}})</h3>
                  <div class="card-links" v-for="post in posts" :key="post.id" @click="$router.push({name: 'agenda-detail',params: { id: post.id }});">
                    <i class="category-pill-small">3</i>
                    <span>
                      {{ post.title }}
                    </span>
                  </div>
                  <div v-if="!viewLestPosts" class="card-links" @click="viewMorePosts()"><span> View more &rarr;</span></div>
                  <div v-if="viewLestPosts" class="card-links" @click="getMyProfile()"><span> View less &rarr;</span></div>
                </div>
                <div class="column is-12-mobile is-4-desktop">
                  <h3 class="card-title">Feedbacks ({{ userData.feedbacks.count}})</h3>
                  <div class="card-links" v-for="feedback in feedbacks" :key="feedback.id" @click="$router.push({name: 'agenda-detail',params: { id: feedback.postId }, query: {scrollTarget: `target-${feedback.id}`}});">
                    <i class="category-pill-small">3</i>
                    <span>
                      {{ feedback.body }}
                    </span>
                  </div>
                  <div class="card-links" @click="viewMoreFeedbacks()"><span> View more &rarr;</span></div>
                </div>
                <div class="column is-12-mobile is-4-desktop">
                  <h3 class="card-title">Replies ({{ userData.replies.count}})</h3>
                  <div class="card-links" v-for="reply in replies" :key="reply.id" @click="$router.push({name: 'agenda-detail',params: { id: reply.postId }, query: {scrollTarget: `target-${reply.id}`}});">
                    <i class="category-pill-small">3</i>
                    <span>
                      {{ reply.body }}
                    </span>
                  </div>
                  <div class="card-links" @click="viewMoreReplies()"><span> View more &rarr;</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserAvatar from './UserAvatar.vue';
import { UserAccountAPI } from '@/api';

export default {
  name: 'MyProfile',
  components: {
    UserAvatar
  },
  data() {
    return {
      userData: {
        profile: {},
        posts: {},
        feedbacks: {},
        replies: {}
      },
      bucket: 'users',
      viewLestPosts: false,
      viewLestFeedbacks: false,
      viewLestReplies: false,
    };
  },
  created() {
    this.getMyProfile();
  },
  methods: {
    async getMyProfile() {
      this.userData = await UserAccountAPI.getMyProfile(5, 0);
      this.viewLestPosts = false;
    },
    async viewMorePosts() {
      this.userData = await UserAccountAPI.getMyProfile(this.userData.posts.count, 0);
      this.viewLestPosts = true;
    }
  },
  computed: {
    profile() {
      return this.userData.profile;
    },
    posts() {
      return this.userData.posts.rows;
    },
    feedbacks() {
      return this.userData.feedbacks.rows;
    },
    replies() {
      return this.userData.replies.rows;
    }
  }
};
</script>
<style scooped>
.site-body {
    margin-top: 1em;
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
  font-size: 14px;
  color: #555;
  margin-left: 7px;
}
.card-links > span:hover {
  color: #333;
  border-bottom: 1px solid #333;
}
.edit-profile{
  margin-left: 200px;
  font-size: 15px;
  color: #593c79;
}
</style>

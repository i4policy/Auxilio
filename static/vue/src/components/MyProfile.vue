<template>
  <div>
    <div class="site-body">
      <div class="columns">
        <div class="column is-offset-1 is-10">
          <div class="site-card" style="padding-bottom: 1em;">
            <div class="site-card-header columns">
              <div class="column is-1 image-avatar">
                <user-avatar class="avatar-big" :bucket="bucket" :size="80" :file-name="profile.profilePicture"/>
              </div>
              <div class="column is-3">
                      <router-link v-if="!this.userAccountId || isOwner" tag="a" :to="{name:'update-profile'}">
                        <b-tooltip label="Edit Profile">
                          <b-icon
                            icon="pencil" class="edit-profile" type="is-secondary"
                            size="is-small"
                          ></b-icon>
                        </b-tooltip>
                      </router-link>
                  <div class="card-title bold profile-header">Profile</div>
                  <div class="header-text bold">{{ profile.fullName }}</div>
                  <div class="header-text bold">{{ profile.title }}</div>
                  <div class="header-text bold">{{ profile.email }}</div>
                  <div class="header-text bold">{{ profile.phoneNumber }}</div>
              </div>
            </div>
            <div class="card-body">
              <div class="columns">
                <div class="column is-12-mobile is-4-desktop">
                  <h3 class="card-title">Posts ({{ posts.count}})</h3>
                  <div class="card-links list-link" v-for="(post, i) in posts.rows" :key="post.id" @click="$router.push({name: 'agenda-detail',params: { id: post.id }});">
                    <!-- <i class="category-pill-small">3</i> -->
                    <span>
                      {{i+1}}. {{ post.title | limitTo(30, '...')}}
                    </span>
                  </div>
                  <div v-if="!viewLessPosts && (posts.count > 5)" class="card-links" @click="viewMorePosts()"><span> View more &rarr;</span></div>
                  <div v-if="viewLessPosts" class="card-links" @click="getMyPosts()"><span> View less &rarr;</span></div>
                </div>
                <div class="column is-12-mobile is-4-desktop">
                  <h3 class="card-title">Feedbacks ({{ feedbacks.count}})</h3>

                  <div class="card-links list-link" v-for="(feedback,i) in feedbacks.rows" :key="feedback.id" @click="$router.push({name: 'agenda-detail',params: { id: feedback.postId }, query: {scrollTarget: `target-${feedback.id}`}});">
                    <!-- <i class="category-pill-small">3</i> -->
                    <span>
                      {{i+1.}} {{ feedback.body | limitTo(30, '...')}}
                    </span>
                  </div>
                  <div v-if="!viewLessFeedbacks && feedbacks.count > 5" class="card-links" @click="viewMoreFeedbacks()"><span> View more &rarr;</span></div>
                  <div v-if="viewLessFeedbacks" class="card-links" @click="getMyFeedbacks()"><span> View less &rarr;</span></div>
                </div>
                <div class="column is-12-mobile is-4-desktop">
                  <h3 class="card-title">Replies ({{ replies.count}})</h3>
                  <div class="card-links list-link" v-for="(reply, i) in replies.rows" :key="reply.id" @click="$router.push({name: 'agenda-detail',params: { id: reply.postId }, query: {scrollTarget: `target-${reply.id}`}});">
                    <!-- <i class="category-pill-small">3</i> -->
                    <span>
                     {{i+1.}} {{ reply.body | limitTo(30, '...')}}
                    </span>
                  </div>
                  <div v-if="!viewLessReplies && replies.count > 5" class="card-links" @click="viewMoreReplies()"><span> View more &rarr;</span></div>
                  <div v-if="viewLessReplies" class="card-links" @click="getMyReplies()"><span> View less &rarr;</span></div>
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
    this.getMyPosts();
    this.getMyFeedbacks();
    this.getMyReplies();
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
</style>

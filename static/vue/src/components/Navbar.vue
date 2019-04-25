<template>
  <nav class="navbar site-header">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link tag="a" :to="{name:'agendas'}">
          <div class="navbar-item" style="height: 64px">
            <img src="@/assets/logo.svg" class="site-logo">
          </div>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="columns" style="width:100%">
          <div class="column is-one-fifths"></div>
          <div class="column is-two-fifths">
            <div class="columns">
              <div class="column is-full">
                <Search/>
              </div>
            </div>
          </div>

          <div class="column is-narrow" v-if="$acl.isModerator">
            <div class="navbar-item">
              <a class="button is-primary" @click="openNewTopic()">
                <b-icon icon="plus" type="is-white" size="is-small"></b-icon>
                <span>New Agenda</span>
              </a>
            </div>
          </div>
          <div class="column"></div>
          <div class="column is-narrow">
            <div class="navbar-item">
              <div class="mb-3 user-pic" size="40px" @click="navigateToMyProfile">
                <span v-if="$acl.hasModeratorPermission()">
                  <b-tag type="is-secondary" class="categories" style="background: #75ec6d">Moderator</b-tag>
                </span>
              </div>
              <div class="mb-3 user-pic" size="40px" @click="navigateToMyProfile">
                <user-avatar :bucket="bucket" :size="30" :file-name="userProfile.profilePicture"/>
              </div>
              <span class="has-text-white is-size-7 user-name" @click="navigateToMyProfile">
                {{ `${userProfile.givenName} ${userProfile.familyName}` }}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <a class="button is-primary" href="#" @click="logout">
                <span>logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a
      class="primary powered-by"
      href="https://gitlab.com/ahadootec-projects/auxilio-front"
      target="_blank"
    >powered by Auxilio</a>
  </nav>
</template>
<script>
import { mapMutations } from 'vuex';
import { AuthService } from '@/services';
import { API_ROOT } from '@/api';
import UserAvatar from './UserAvatar.vue';
import Search from './Search.vue';
import IssueReport from './IssueReport.vue';

export default {
  name: 'Navbar',
  components: {
    UserAvatar,
    Search
  },
  data() {
    return {
      profilePopupVisible: false,
      appName: 'Auxilio',
      bucket: 'users',
      userProfile: AuthService.getProfile()
    };
  },
  methods: {
    ...mapMutations('layout', ['toggleNavBar']),
    logout() {
      AuthService.logout();
    },
    openNewTopic() {
      this.$router.push({ name: 'create-agenda' });
    },
    navigateToMyProfile() {
      this.$router.push({ name: 'profile' });
    },
    openIssueReport() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        props: {},
        events: {
          close: async () => {}
        },
        component: IssueReport,
        hasModalCard: true
      });
    }
  },
  computed: {
    imgUrl() {
      if (!this.userProfile.profilePicture) {
        return false;
      }
      const img = this.userProfile.profilePicture;
      return `${API_ROOT}/Containers/users/download/${img}`;
    }
  }
};
</script>
<style>
.site-header {
  background-color: transparent !important;
  box-shadow: 0 6px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

.search-input {
  background-color: #fff;
  border-color: #edf1f2;
  border: 1px solid #ddd;
  box-shadow: 0 6px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  border-radius: 3px;
  height: 34px;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  border: 1px solid #d5dce0;
  border-radius: 4px;
  outline: none;
  width: 100%;
  padding: 5px 10px;
  position: relative;
}
.user-avatar {
  border-radius: 30px;
  margin-right: 10px;
  margin-top: 10px;
}
.user-name,
.user-pic {
  cursor: pointer;
}
.powered-by {
  position: fixed;
  right: 30px;
  bottom: 10px;
}
.issue {
  position: fixed;
  right: 30px;
  bottom: 50px;
}
</style>

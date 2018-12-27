<template>
  <nav class="navbar site-header">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link tag="a" :to="{name:'agendas'}">
          <div class="navbar-item">
            <img src="@/assets/logo.svg" class="site-logo">
          </div>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="columns" style="width:100%">
          <div class="column is-one-fifths"></div>
          <div class="column is-three-fifths">
            <div class="columns">
              <div class="column"></div>
              <div class="column is-three-fifths">
                <div class="navbar-item">
                  <input class="search-input" type="text" placeholder="Search">
                </div>
              </div>

            </div>
          </div>

          <div class="column is-narrow" v-if="this.userProfile.role == 'admin'">
            <div class="navbar-item">
              <a class="button is-primary " href="#" @click="openNewAgenda()">
                <b-icon icon="plus" type="is-white" size="is-small"></b-icon>
                <span>New Agenda</span>
              </a>
            </div>
          </div>
              <div class="column"></div>
          <div class="column is-narrow">
            <div class="navbar-item">
              <VAvatar class="mb-3" size="40px">
                <img class="user-avatar" :src="userProfile.profilePicture" alt="Avatar" />
              </VAvatar>
              <span class="has-text-white is-size-7">
                {{userProfile.fullName}}
                 &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              <a class="button is-primary " href="#" @click="logout">
                <span>logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapMutations } from 'vuex';
import { AuthService } from '@/services/services.index';
import NewAgenda from './NewAgenda.vue';
import { API_ROOT } from '@/api/api.index';

export default {
  name: 'Navbar',
  data() {
    return {
      profilePopupVisible: false,
      appName: 'Auxilio',
      userProfile: {}
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapMutations('layout', ['toggleNavBar']),
    logout() {
      AuthService.logout();
    },
    openNewAgenda() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        component: NewAgenda,
        hasModalCard: true
      });
    },
    getUser() {
      this.userProfile = AuthService.getProfile();
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
  },
};
</script>
<style>
.site-header {
  background-color: transparent !important;
  box-shadow: 0 6px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

.site-logo {
  width: 80px;
  height: 56px;
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
</style>

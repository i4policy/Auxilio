/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const core = {
  namespaced: true,
  state: {
    newAgenda: null,
    pendingNetworkRequest: 0
  },
  mutations: {
    newAgendaCreated(state, agenda) {
      state.newAgenda = agenda;
    },
    addPendingRequest(state) {
      state.pendingNetworkRequest += 1;
    },
    removePendingRequest(state) {
      state.pendingNetworkRequest -= 1;
    }
  },
  getters: {
    showNetworkProgressBar: state => state.pendingNetworkRequest > 0
  }
};

const layout = {
  namespaced: true,
  state: {
    navDrawerToggle: true,
  },
  getters: {},
  mutations: {
    toggleNavBar(state) {
      // eslint-disable-next-line
      state.navDrawerToggle = !state.navDrawerToggle;
    },
  },
};


export default new Vuex.Store({
  modules: {
    layout,
    core,
  },
});

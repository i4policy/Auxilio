<template>
  <div>
    <div class="navbar-item no-padding-left no-padding-right">
      <input
        id="search-input"
        class="search-input"
        v-model="query"
        type="text"
        placeholder="Search"
      >
      <div
        v-on-clickaway="away"
        :class="{'show':showDropDown}"
        class="search-bar-filter"
        id="search-bar-filter-overlay"
        :style="{'max-height':`${windowHeight - searchDropDownOffset}px`}"
      >
        <div
          v-for="(item,index) in result"
          :key="index"
          @click="handleOpenResultItem(item.postId)"
          class="columns text-left no-margin-left no-margin-right"
        >
          <div class="column search-card pointer">
            <div class="search-card-header columns no-margin-left no-margin-right">
              <div class="column no-padding is-8">
                <img
                  src="http://localhost:3001/api/Containers/users/download/avatar_anonymous.png"
                  class="avatar"
                >
                <div class="avatar-content">
                  <div v-if="item.createdBy" class="header-text bold">
                    {{`${item.createdBy.givenName} ${item.createdBy.familyName}`}}
                  </div>
                </div>
              </div>
              <div v-if="item.postCategory" class="column no-padding is-4 text-right">
                <i class="category-pill-small">{{item.postCategory.name}}</i>
              </div>
            </div>
            <div class="card-body no-padding">
              <h4 class="card-title no-margin">{{item.title}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import { SearchAPI } from '@/api';

const debounce = require('lodash.debounce');

export default {
  mixins: [clickaway],
  name: 'Search',
  data() {
    return {
      query: null,
      loading: false,
      result: [],
      showDropDown: false,
      windowHeight: window.innerHeight
    };
  },
  computed: {
    searchDropDownOffset() {
      return this.windowHeight * 0.1;
    }
  },
  methods: {
    doSearch: debounce(async function s() {
      if (this.query) {
        this.search();
      } else {
        // @todo handle search input cleared
      }
    }, 500),
    async search() {
      this.loading = true;
      this.errorMessage = null;
      this.result = await SearchAPI.search(this.query);
      if (this.result && this.result.length) {
        this.showDropDown = true;
      } else {
        this.showDropDown = false;
      }
      this.loading = false;
    },
    handleOpenResultItem(agendaId) {
      if (!agendaId) return;
      this.$router.push({
        name: 'agenda-detail',
        params: { id: agendaId }
      });
      this.reset();
    },
    away(event) {
      if (!event || !event.target) return;
      // ignore event from search input
      if (event.target.id === 'search-input') return;
      this.reset();
    },
    reset() {
      this.showDropDown = false;
      this.query = '';
      this.result = [];
      this.loading = false;
      this.errorMessage = null;
    }
  },
  watch: {
    query: {
      handler() {
        this.doSearch();
      }
    }
  }
};
</script>

<style >
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
.search-bar-filter {
  position: absolute;
  left: 0;
  top: 45px;
  right: 0;
  box-shadow: 0 6px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  background: #fff;
  padding: 0.5em 0.5em;
  padding-top: 1em;
  border-radius: 3px;
  display: none;
  overflow: auto;
}
.show {
  display: block;
}
.category-pill-small {
  background: #aaa;
  color: #fff;
  padding: 1px 10px;
  border-radius: 1em;
}

.search-card {
  padding: 0 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  background: #fff;
  border-radius: 3px;
}
.search-card:hover {
  background: #eee;
  box-shadow: 0 4px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

.search-card-header {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.no-margin {
  margin: 0 !important;
}
.no-padding {
  padding: 0 !important;
}
.no-padding-left {
  padding-left: 0 !important;
}
.no-padding-right {
  padding-right: 0 !important;
}
.no-margin-left {
  margin-left: 0 !important;
}
.no-margin-right {
  margin-right: 0 !important;
}
.text-right {
  text-align: right;
}
</style>

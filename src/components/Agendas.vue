<template>
  <div style="padding-top:0.5em;">
    <div v-if="isLoading" class="columns is-centered spinner">
      <atom-spinner :animation-duration="1000" :size="60" :color="'rgb(255,255,255)'"/>
    </div>
    <div v-if="!isLoading" class="columns is-centered">
      <div class="column is-narrow has-text-centered">
        <tag
          :b-color="category.color"
          v-for="(category, i) in categoryList"
          :key="i"
          @click.native="filterByCategory(category.id)"
        >{{category.name}}</tag>
      </div>
    </div>
    <div v-if="!isLoading && agendaList.length == 0" class="columns is-centered no-found">
      <p>No agenda found.</p>
    </div>
    <div v-if="!isLoading" class="columns is-multiline is-3">
      <div
        class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
        v-for="(agenda, i) in agendaList"
        :key="i"
      >
        <agenda-item :content="agenda"></agenda-item>
      </div>
    </div>
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners';
import { mapState } from 'vuex';
import AgendaItem from './AgendaItem.vue';
import { AgendaAPI, PostCategoryAPI } from '@/api/api.index';

export default {
  components: {
    AgendaItem,
    AtomSpinner
  },
  name: 'Agendas',
  data() {
    return {
      agendaList: [],
      categoryList: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState('core', ['newAgenda'])
  },
  created() {
    this.getCategories();
    this.getAgendas();
  },
  methods: {
    async getCategories() {
      const categories = await PostCategoryAPI.all();
      this.categoryList = categories.rows;
    },
    async getAgendas(filter = {}) {
      this.isLoading = true;
      const agendas = await AgendaAPI.all(filter);
      this.agendaList = agendas.rows;
      this.isLoading = false;
    },
    async filterByCategory(categoryId) {
      if (categoryId) {
        await this.getAgendas({ categoryId });
      }
    }
  },
  watch: {
    newAgenda(val) {
      this.agendaList.unshift(val);
    }
  }
};
</script>
<style scoped lang="scss">
.spinner {
  margin-top: 200px;
}
.no-found {
  font-size: 20px;
  color: rgb(255, 255, 255);
  margin-top: 200px;
}
</style>

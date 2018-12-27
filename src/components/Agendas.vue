<template>
  <div style="padding-top:0.5em;">
    <div class="columns is-centered">
      <div class="column is-narrow has-text-centered">
        <tag
          :b-color="category.color"
          f-color="#fff"
          v-for="(category, i) in categoryList"
          :key="i"
        >{{category.name}}</tag>
      </div>
    </div>
    <div class="columns is-multiline is-3">
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
import AgendaItem from './AgendaItem.vue';
import { AgendaAPI, PostCategoryAPI } from '@/api/api.index';

export default {
  components: {
    AgendaItem
  },
  name: 'Agendas',
  data() {
    return {
      agendaList: [],
      categoryList: []
    };
  },
  created() {
    this.getAgendas();
    this.getCategories();
  },
  methods: {
    async getCategories() {
      const categories = await PostCategoryAPI.all();
      this.categoryList = categories.rows;
    },
    async getAgendas() {
      const agendas = await AgendaAPI.all();
      console.log(agendas);
      this.agendaList = agendas.rows;
    }
  }
};
</script>
<style scoped lang="scss">
</style>

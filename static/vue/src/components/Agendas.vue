<template>
  <div style="padding-top:0.5em;">
    <div v-if="isLoading" class="columns is-centered spinner">
      <atom-spinner :animation-duration="1000" :size="60" :color="'rgb(255,255,255)'"/>
    </div>
    <!-- <div v-if="!isLoading" class="columns is-centered">
      <div class="column is-narrow has-text-centered">
        <b-tag
          type="is-white"
          class="categories"
          @click.native="filterByAll()"
        >All</b-tag>
        <b-tag
          class="categories"
          v-for="(category, i) in categoryList"
          :key="i"
          closable
          v-bind:style="[{background: category.color }]"
          @close="deleteCategory(category.id)"
        >{{category.name}}</b-tag>
         <tag
          @click.native="openCategoryModal()"
        class="add-category"
        ><b-tooltip label="New Category" position="is-bottom">+</b-tooltip>
        </tag>
      </div>
    </div> -->
    <div v-if="!isLoading && agendaList.length == 0" class="columns is-centered no-found">
      <p>No agenda found.</p>
    </div>

    <div v-if="!isLoading" class="agenda-container">
      <draggable v-model="agendaList">
          <div
            class="agenda-card"
            v-for="(agenda, i) in agendaList"
            :key="i"
          >
            <agenda-item :content="agenda" @onDelete="deleteTopic($event)"></agenda-item>
          </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners';
import draggable from 'vuedraggable';
import AgendaItem from './AgendaItem.vue';
import { AgendaAPI, PostCategoryAPI } from '@/api';
import NewCategory from './NewCategory.vue';
import ConfirmationDialog from '../shared/components/ConfirmationDialog.vue';

export default {
  components: {
    AgendaItem,
    AtomSpinner,
    draggable
  },
  name: 'Agendas',
  data() {
    return {
      agendaList: [],
      categoryList: [],
      isLoading: true
    };
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
    },
    async filterByAll() {
      await this.getAgendas();
    },
    openCategoryModal() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        events: {
          close: (data) => {
            this.getCategories();
          }
        },
        component: NewCategory,
        hasModalCard: true
      });
    },
    deleteCategory(id) {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        events: {
          close: async (data) => {
            if (data) {
              await PostCategoryAPI.remove(id);
              this.getCategories();
              this.$toast.open({
                message: 'Category deleted.',
                type: 'is-success',
                position: 'is-top'
              });
            }
          }
        },
        component: ConfirmationDialog,
        hasModalCard: true
      });
    },
    async deleteTopic(id) {
      await AgendaAPI.removeMainTopic(id);
      this.getAgendas();
      this.$toast.open({
        message: 'Topic deleted.',
        type: 'is-success',
        position: 'is-top'
      });
    }
  }
};
</script>
<style scoped lapng="scss">
.spinner {
  margin-top: 200px;
}
.no-found {
  font-size: 20px;
  color: rgb(255, 255, 255);
  margin-top: 200px;
}
.add-category {
  color: #fff !important;
  background-color:#08020266 !important;
  font-size: 18px;
}
.add-category:hover {
  background-color: #111 !important;
}
.categories {
  margin-right: 10px;
  cursor: pointer;
}
.agenda-container {
  overflow-x: scroll;
}
.agenda-card {
  display: table-cell;
  padding-left: 1em;
}
::-webkit-scrollbar {
  height: 2px;              /* height of horizontal scrollbar ← You're missing this */
  width: 2px;               /* width of vertical scrollbar */
  border: 1px solid #9999;
}
</style>

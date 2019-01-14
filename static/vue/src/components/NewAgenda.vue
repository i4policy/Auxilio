<template>
  <form class="columns" @submit.prevent="save" novalidate>
    <div class="column is-8 is-offset-2">
      <header
        class="modal-card-head has-background-info has-text-centered"
        style="justify-content: center;"
      >
        <p class="modal-card-title has-text-white">Create new agenda</p>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <b-field
            label="Title"
            :type="{'is-danger': errors.has('title')}"
            :message="errors.first('title')"
            >
            <b-input
                type="text"
                v-model="item.title"
                placeholder="title*"
                title="title"
                v-validate="'required'"
            ></b-input>
            </b-field>
            <b-field label="Description">
                <wysiwyg required v-model="item.description"/>
            </b-field>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot has-background-info" style="justify-content: right;">
        <div class="is-pulled-right">
          <button class="button" type="button" @click="cancel">Cancel</button>
          <button class="button is-primary">Save</button>
        </div>
      </footer>
    </div>
  </form>
</template>
<script>
import { AgendaAPI, PostCategoryAPI } from '@/api';

export default {
  name: 'NewAgenda',
  data() {
    return {
      item: {
      },
      categoryList: []
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'agendas' });
    },
    async getCategoryList() {
      const categories = await PostCategoryAPI.all();
      this.categoryList = categories.rows;
    },
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        await AgendaAPI.createMainTopic(this.item);
        this.$toast.open({
          message: 'Topic created successfully.',
          type: 'is-success',
          position: 'is-top'
        });
        this.$router.push({ name: 'agendas' });
      }
    }
  }
};
</script>

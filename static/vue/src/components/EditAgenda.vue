<template>
  <div>
    <form @submit.prevent="save" novalidate>
      <div class="modal-card">
        <header
          class="modal-card-head has-background-info has-text-centered"
          style="justify-content: center;"
        >
          <p class="modal-card-title has-text-white">Edit agenda</p>
        </header>
        <section class="modal-card-body">
          <b-field
            label="Title"
            :type="{'is-danger': errors.has('title')}"
            :message="errors.first('title')"
          >
            <b-input
              type="text"
              v-model="item.title"
              placeholder="Agenda title"
              name="title"
              v-validate="'required'"
            ></b-input>
          </b-field>

          <div class="columns">
            <div class="column">
              <b-field
                label="Due Date"
                :type="{'is-danger': errors.has('due date')}"
                :message="errors.first('due date')"
              >
                <b-datepicker
                  v-validate="'required'"
                  v-model="item.endDate"
                  placeholder="Due date"
                  name="due date"
                  icon="calendar-today"
                ></b-datepicker>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Category">
                <b-select v-model="item.categoryId" placeholder="Select a category" expanded>
                  <option
                    v-for="option in categoryList"
                    :value="option.id"
                    :key="option.id"
                  >{{ option.name }}</option>
                </b-select>
              </b-field>
            </div>
          </div>
          <b-field label="Description">
            <wysiwyg required v-model="item.description"/>
          </b-field>
        </section>
        <footer class="modal-card-foot has-background-info" style="justify-content: center;">
          <div class="is-pulled-right">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary">Save</button>
          </div>
        </footer>
      </div>
    </form>
  </div>
</template>
<script>
import { AgendaAPI, PostCategoryAPI } from '@/api';

export default {
  name: 'EditAgenda',
  props: {
    agendaId: {
      type: [String],
      default: () => ''
    }
  },
  data() {
    return {
      item: {},
      categoryList: []
    };
  },
  created() {
    this.getCategoryList();
    this.getAgenda();
  },
  methods: {
    async getAgenda() {
      const item = await AgendaAPI.get(this.agendaId);
      this.item = {
        title: item.title,
        endDate: new Date(item.endDate),
        categoryId: item.categoryId,
        description: item.description
      };
    },
    async getCategoryList() {
      const categories = await PostCategoryAPI.all();
      this.categoryList = categories.rows;
    },
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        const formData = new FormData();
        const item = { ...this.item, postId: this.agendaId };
        Object.keys(item).forEach((key) => {
          formData.append(key, item[key]);
        });
        await AgendaAPI.update(formData);
        this.$toast.open({
          message: 'Agenda updated successfully.',
          type: 'is-success',
          position: 'is-top'
        });
        this.$emit('close');
      } else {
        this.$toast.open({
          message: 'Form is not valid! Please check the fields.',
          type: 'is-danger',
          position: 'is-top'
        });
      }
    }
  }
};
</script>

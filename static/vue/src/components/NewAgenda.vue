<template>
  <form class="columns" @submit.prevent="save" novalidate>
    <div class="column is-8 is-offset-2">
      <header
        class="modal-card-head has-background-info has-text-centered"
        style="justify-content: center;"
      >
        <p class="modal-card-title has-text-white">Post new agenda</p>
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
            <b-field
              label="Category"
              :type="{'is-danger': errors.has('category')}"
              :message="errors.first('category')"
            >
              <b-select
                v-validate="'required'"
                v-model="item.categoryId"
                placeholder="Select a category"
                expanded
                name="category"
              >
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
        <p class="control attachment-btn">
          <button type="button" class="button" @click="openAttachFile">
            <b-icon icon="attachment"></b-icon>
            <span style="margin-left:4px">Add Files</span>
          </button>
        </p>
        <template v-for="(file,index) in item.files">
          <FilePreview :bucket="'feedback'" :key="index" :fileData="file"/>
        </template>
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
import FilePreview from '@/components/FilePreview.vue';
import FileUpload from '@/components/FileUpload.vue';

export default {
  name: 'NewAgenda',
  components: {
    FilePreview
  },
  data() {
    return {
      item: {
        files: []
      },
      categoryList: []
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    openAttachFile() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        events: {
          close: (data) => {
            this.onFileAttach(data);
          }
        },
        component: FileUpload,
        hasModalCard: true
      });
    },
    onFileAttach(data) {
      const { file, meta } = data;
      this.item.files.push({ file, meta });
    },
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
        const formData = new FormData();
        Object.keys(this.item).forEach((key) => {
          const value = typeof this.item[key] === 'object'
            && !(this.item[key] instanceof Date)
            ? JSON.stringify(this.item[key])
            : this.item[key];
          formData.append(key, value);
        });
        // add files
        for (let i = 0; i < this.item.files.length; i += 1) {
          const { file } = this.item.files[i];
          if (file && file.name) {
            formData.append(`file-${i}`, file, file.name);
          }
        }

        await AgendaAPI.create(formData);
        this.$toast.open({
          message: 'Agenda created successfully.',
          type: 'is-success',
          position: 'is-top'
        });
        this.$router.push({ name: 'agendas' });
      }
    }
  }
};
</script>

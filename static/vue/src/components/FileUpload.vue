<template>
  <div>
    <form @submit.prevent="save" novalidate>
      <div class="modal-card">
        <header
          class="modal-card-head has-background-info has-text-centered"
          style="justify-content: center;"
        >
          <p class="modal-card-title has-text-white">Attach File</p>
        </header>
        <section class="modal-card-body">
          <b-field
            label="Title"
            :type="{'is-danger': errors.has('title')}"
            :message="errors.first('title')"
          >
            <b-input
              type="text"
              v-model="meta.title"
              placeholder="Title*"
              name="title"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <b-field
            label="Year Of Report"
            :type="{'is-danger': errors.has('year')}"
            :message="errors.first('year')"
          >
            <b-datepicker
              v-validate="'required'"
              v-model="meta.year"
              placeholder="Year Of Report*"
              name="year"
              icon="calendar-today"
            ></b-datepicker>
          </b-field>

          <b-field class="file">
            <b-upload v-model="file">
              <a class="button is-primary">
                <b-icon icon="attachment"></b-icon>
                <span>Choose File</span>
              </a>
            </b-upload>
            <span class="file-name" v-if="file">{{ file.name }}</span>
          </b-field>

          <b-field label="Summary">
            <wysiwyg required v-model="meta.summary"/>
          </b-field>

          <b-field label="Bibiliography">
            <wysiwyg required v-model="meta.bibliography"/>
          </b-field>
        </section>
        <footer class="modal-card-foot has-background-info" style="justify-content: center;">
          <div class="is-pulled-right">
            <button class="button" type="button" @click="save">Close</button>
            <button class="button is-primary">Save</button>
          </div>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      meta: {
        title: '',
        year: null,
        summary: '',
        bibliography: ''
      },
      file: null
    };
  },

  methods: {
    save() {
      const data = { meta: this.meta, file: this.file };
      this.$emit('close', data);
    }
  }
};
</script>

<style>
</style>

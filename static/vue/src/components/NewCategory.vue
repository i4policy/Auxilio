<template>
  <div>
    <form @submit.prevent="save" novalidate>
      <div class="modal-card">
        <header
          class="modal-card-head has-background-info has-text-centered"
          style="justify-content: center;"
        >
        <p class="modal-card-title has-text-white">Create new category</p>
        </header>
         <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <b-field
            label="Name"
            :type="{'is-danger': errors.has('name')}"
            :message="errors.first('name')"
            >
            <b-input
                type="text"
                v-model="item.name"
                placeholder="Category Name*"
                name="name"
                v-validate="'required'"
            ></b-input>
            </b-field>
          </div>
          <div class="column">
            <div class="form__field">
              <div class="form__input">
                <Swatches v-model="item.color" :colors="colors" popover-to="left"></Swatches>
              </div>
            </div>
          </div>
        </div>
      </section>
        <footer class="modal-card-foot has-background-info" style="justify-content: center;">
          <div class="is-pulled-right">
            <button class="button" type="button" @click="cancel">Close</button>
            <button class="button is-primary">Save</button>
          </div>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { PostCategoryAPI } from '@/api';
import Swatches from 'vue-swatches';

export default {
  name: 'NewCategory',
  components: {
    Swatches
  },
  data() {
    return {
      colors: ['#F64272', '#388e3c', '#2196f3', '#725493', '#01001e', '#d8cd50', ''],
      resourceName: 'Category',
      item: {
        color: '#F64272'
      }
    };
  },
  methods: {
    cancel() {
      this.$emit('close');
    },
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        await PostCategoryAPI.create(this.item);
        this.$toast.open({
          message: 'Category created successfully.',
          type: 'is-success',
          position: 'is-top'
        });
        this.$emit('close');
      }
    }
  }
};
</script>

<style>
</style>

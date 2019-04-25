<template>
  <div>
    <form @submit.prevent="save" novalidate>
      <div class="modal-card">
        <header
          class="modal-card-head has-background-info has-text-centered"
          style="justify-content: center;"
        >
          <p class="modal-card-title has-text-white">Delete Request</p>
        </header>
        <section class="modal-card-body">
          <b-field
            label="Why do you think this post should be deleted?"
            :type="{'is-danger': errors.has('reasonToDelete')}"
            :message="errors.first('reasonToDelete')"
          >
            <b-input
              maxlength="200"
              type="textarea"
              v-model="item.reasonToDelete"
              v-validate="'required'"
            ></b-input>
          </b-field>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AgendaAPI } from '@/api';

export default {
  name: 'DeleteRequest',
  props: {
    agendaId: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      item: {},
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  created() {},
  methods: {
    cancel() {
      this.$emit('close');
    },
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        await AgendaAPI.remove(this.agendaId, this.item.reasonToDelete);
        this.$toast.open({
          message: 'Delete request sent to moderator.',
          type: 'is-success',
          position: 'is-top'
        });
        this.$emit('close', true);
      }
    }
  }
};
</script>
<style scoped>
.modal-card {
  width: 740px;
  min-height: 550px;
}

.modal-card label {
  font-weight: 600;
}
</style>

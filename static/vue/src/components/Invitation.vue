<template>
  <div>
    <form @submit.prevent="save" novalidate>
      <div class="modal-card">
        <header
          class="modal-card-head has-background-info has-text-centered"
          style="justify-content: center;"
        >
        <p class="modal-card-title has-text-white">Invite Users</p>
        </header>
         <section class="modal-card-body">
            <div class="columns">
              <div class="column is-12">
                <b-field
                  label="Email"
                  :type="{'is-danger': errors.has('email')}"
                  :message="errors.first('email')"
                >
                  <b-input
                    type="text"
                    v-model="item.email"
                    placeholder="Topic email*"
                    name="email"
                    v-validate="'required'"
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">

        </div>
        <b-field label="Invitation Message">
            <ckeditor :editor="editor" v-model="item.invitationMessage" :config="editorConfig"></ckeditor>
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
import { AgendaAPI } from '@/api';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'Invitation',
  data() {
    return {
      item: {
        invitationMessage: 'We are discussing on this Topic in Auxilio and wanted to share it with you!'
      },
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  props: {
    mainTopicId: { required: true }
  },
  created() {
  },
  methods: {
    cancel() {
      this.$emit('close');
    },
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.item.mainTopicId = this.mainTopicId;
        await AgendaAPI.invite(this.item);
        this.$toast.open({
          message: 'User invited.',
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
</style>

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
        <b-field label="Enter some users"
            :type="{'is-danger': errors.has('users')}"
            :message="errors.first('users')">
            <b-taginput
                v-model="users"
                :data="filteredUsers"
                autocomplete
                field="givenName"
                name="users"
                icon="label"
                placeholder="Add a user"
                @typing="getFilteredTags"
                v-validate="'required'">
                <template slot-scope="props">
                    <strong>{{`${props.option.givenName} ${props.option.familyName}`}}</strong><br> {{props.option.email}}
                </template>
                <template slot="empty">
                    There are no users
                </template>
            </b-taginput>
        </b-field>
        <pre style="max-height: 400px"><b>Tags:</b>{{ users }}</pre>
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
import { UserAccountAPI } from '@/api';

const debounce = require('lodash.debounce');

export default {
  name: 'Invitation',
  data() {
    return {
      filteredUsers: this.data,
      isSelectOnly: false,
      users: [],
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
        const invitedEmails = this.users.map(user => user.email);
        const emailObj = {
          invitedEmails
        };
        this.item.mainTopicId = this.mainTopicId;
        this.item.emailObj = emailObj;
        await AgendaAPI.invite(this.item);
        this.$toast.open({
          message: 'Users invited.',
          type: 'is-success',
          position: 'is-top'
        });
        this.$emit('close', true);
      }
    },
    getFilteredTags: debounce(async function s(text) {
      const searchText = text.trim();

      const invitedEmails = this.users.map(user => user.email);
      const emailObj = {
        invitedEmails
      };

      if (searchText) this.filteredUsers = await UserAccountAPI.search({ emailObj, keyword: searchText });
    }, 500),
  }
};
</script>
<style scoped>
.modal-card {
  width: 740px;
  min-height: 550px;
}
</style>

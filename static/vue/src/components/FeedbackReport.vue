<template>
  <div>
    <form @submit.prevent="save" novalidate>
      <div class="modal-card">
        <header
          class="modal-card-head has-background-info has-text-centered"
          style="justify-content: center;"
        >
        <p class="modal-card-title has-text-white">Feedback Report</p>
        </header>
         <section class="modal-card-body">
             <div class="columns">
                 <div class="column is-5">
                     <label for=""> Choose Type</label>
                 </div>
                 <div class="column is-7">
                     <label for=""> Choose Urgency Level</label>
                 </div>
             </div>
             <div class="columns">
                 <div class="column is-5">
                     <b-field>
                        <b-radio-button v-model="item.feedbackType"
                            native-value="FEEDBACK"
                            type="is-success">
                            <b-icon icon="comment"></b-icon>
                            <span>Feedback</span>
                        </b-radio-button>

                        <b-radio-button v-model="item.feedbackType"
                            native-value="ISSUE"
                            type="is-danger">
                            <b-icon icon="bell"></b-icon>
                            <span>Issue</span>
                        </b-radio-button>
                    </b-field>
                 </div>
                 <div class="column is-7">
                     <b-field>
                        <b-radio-button v-model="item.urgencyLevel"
                            native-value="HIGH"
                            type="is-danger"
                            :disabled="item.feedbackType !== 'ISSUE'"
                            >
                            <b-icon icon="comment"></b-icon>
                            <span>High</span>
                        </b-radio-button>

                        <b-radio-button v-model="item.urgencyLevel"
                            :native-value="MEDIUM"
                            type="is-warning"
                            :disabled="item.feedbackType !== 'ISSUE'"
                            >
                            <b-icon icon="check"></b-icon>
                            <span>Medium</span>
                        </b-radio-button>

                        <b-radio-button v-model="item.urgencyLevel"
                            native-value="LOW"
                            type="is-info"
                            :disabled="item.feedbackType !== 'ISSUE'"
                            >
                            <b-icon icon="check"></b-icon>
                            <span>Low</span>
                        </b-radio-button>
                    </b-field>
                 </div>
             </div>
        <b-field label="Description" :type="{'is-danger': errors.has('users')}"
            :message="errors.first('users')">
            <b-input maxlength="200" type="textarea" v-model="item.description" v-validate="'required'"></b-input>
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
  name: 'FeedbackReport',
  data() {
    return {
      filteredUsers: this.data,
      isSelectOnly: false,
      users: [],
      item: {
        feedbackType: 'FEEDBACK',
        urgencyLevel: 'MEDIUM',
      },
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
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
        await UserAccountAPI.feedback(this.item);
        this.$toast.open({
          message: 'Feedback Sent.',
          type: 'is-success',
          position: 'is-top'
        });
        this.$emit('close', true);
      }
    }
  }
}
</script>
<style scoped>
.modal-card {
  width: 740px;
  min-height: 550px;
}
</style>

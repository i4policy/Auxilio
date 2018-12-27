<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths">
      <div class="card" style="margin-top:1em; border-radius:0.7em;">
        <div class="card-content">
          <div class="columns">
            <div class="column">
              <p class="title">{{agenda.title}}</p>
              <div class="has-text-centered">{{agenda.createdAt | formatDate}}</div>
              <p class="subtitle has-text-centered">
                <tag :b-color="agenda.category.color">{{agenda.category.name}}</tag>
              </p>
              <div class="has-text-grey">{{agenda.description}}</div>
            </div>

            <div class="column is-narrow" style="align-items:center; display: flex;">
              <div class="is-block">
                <div class="is-block has-text-centered" @click="upVote()">
                  <b-tooltip label="Up Vote">
                    <b-icon
                      icon="thumb-up"
                      type="is-primary"
                      size="is-medium"
                      custom-class="pointer"
                    ></b-icon>
                  </b-tooltip>
                </div>
                <div class="is-block">
                  <hr>
                </div>
                <div class="is-block has-text-centered" @click="downVote()">
                  <b-tooltip label="Down Vote" position="is-bottom" type="is-dark">
                    <b-icon
                      icon="thumb-down"
                      type="is-grey-lighter"
                      size="is-medium"
                      custom-class="pointer"
                    ></b-icon>
                  </b-tooltip>
                </div>
                <!-- <div class="is-block has-text-centered">
                    <span class="is-size-7">Down vote</span>
                </div>-->
              </div>
            </div>
          </div>
          <div class="break"></div>

          <div class="columns">
            <div class="column">
              <progress class="progress is-primary" :value="agenda.progress" max="100">{{agenda.progress}}%</progress>
            </div>
            <div class="column is-narrow">{{agenda.remainingDays}} days remaing</div>
          </div>
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">
                  <b-icon icon="thumb-up" type="is-grey-lighter" size="is-small"></b-icon>Up Vote
                </p>
                <p class="title has-text-primary">{{agenda.upVote}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">
                  <b-icon icon="thumb-down" type="is-grey-lighter" size="is-small"></b-icon>Down Vote
                </p>
                <p class="title">{{agenda.downVote}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">
                  <b-icon icon="message" type="is-grey-lighter" size="is-small"></b-icon>Feedbacks and Comments
                </p>
                <p class="title has-text-success">456K</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              &nbsp;&nbsp;
              <small class="has-text-link pointer" @click="editAgenda()">EDIT</small>
                &nbsp;&nbsp;
              <small class="has-text-danger pointer" @click="deleteAgenda()">DELETE</small>
            </div>
          </nav>
          <div class="has-text-centered"></div>
          <feedback-input @success="handleNewFeedback($event)" :post-id="agenda.id"/>
        </div>
      </div>
      <div class="card" style="margin-top:1em; border-radius:0.7em;">
        <div class="card-content">
          <feedback-item
            class="media"
            v-for="(feedback,i) in agenda.feedbacks"
            :key="i"
            :feedback="feedback"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AgendaAPI, AgendaVoteAPI } from '@/api/api.index';
import FeedbackItem from './FeedbackItem.vue';
import FeedbackInput from './FeedbackInput.vue';
import EditAgenda from './EditAgenda.vue';

export default {
  name: 'AgendaDetail',
  components: {
    FeedbackItem,
    FeedbackInput
  },
  data() {
    return {
      agenda: {
        category: {}
      }
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getAgenda(id);
  },
  methods: {
    async handleNewFeedback(feedback) {
      if (this.agenda.feedbacks && feedback) {
        this.agenda.feedbacks.unshift(feedback);
      }
    },
    async getAgenda(id) {
      this.agenda = await AgendaAPI.detail(id);
    },
    async upVote() {
      await AgendaVoteAPI.vote({
        postId: this.agenda.id,
        vote: 1
      });
      this.$toast.open({
        message: 'Up votted',
        type: 'is-primary',
        position: 'is-top'
      });
    },
    async downVote() {
      await AgendaVoteAPI.vote({
        postId: this.agenda.id,
        vote: -1
      });
      this.$toast.open({
        message: 'Down votted',
        type: 'is-info',
        position: 'is-top'
      });
    },
    editAgenda() {
      this.$modal.open({
        scroll: 'keep',
        parent: this,
        component: EditAgenda,
        hasModalCard: true,
        props: {
          agendaId: this.agenda.id
        }
      });
    },
    async deleteAgenda() {
      this.$dialog.confirm({
        title: 'Deleting agenda',
        message: 'Are you sure you want to <b>delete</b> the agenda? This action cannot be undone.',
        confirmText: 'Delete Agenda',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await AgendaAPI.remove({
            postId: this.agenda.id
          });
          this.$toast.open({
            message: 'Agenda deleted successfully.',
            type: 'is-success',
            position: 'is-top'
          });
        }
      });
    }
  }
};
</script>

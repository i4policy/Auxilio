<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths">
      <div class="card" style="margin-top:1em; border-radius:0.7em;">
        <div class="card-content">
          <div class="columns">
            <div class="column">
              <p @click.stop="backToAgendas()" style="float:right">
                <b-icon
                icon="close" class="back" type="is-secondary" position="is-bottom"
                size="is-small"
                ></b-icon>
              </p>
              <p class="subtitle">
                <tag
                  v-if="agenda.category"
                  :b-color="agenda.category.color"
                  class="category"
                >{{agenda.category.name}}</tag>
                <span class="post-creater" @click.stop="openProfile(agenda.createdBy.id)">{{agenda.createdBy.fullName}}</span>
                <vue-next-level-scroll :target="`#${scrollTarget}`" ref="scrollRef"></vue-next-level-scroll>
              </p>
              <p class="title">{{agenda.title}}</p>
              <div v-html="agenda.description" class="has-text-grey"></div>
              <div class="has-text-centered">
                <small>{{agenda.startDate | formatDate}}</small>
                -
                <small>{{agenda.endDate | formatDate}}</small>
              </div>
            </div>

            <div class="column is-narrow" style="align-items:center; display: flex;">
              <div class="is-block">
                <div class="is-block has-text-centered" @click="vote(1)">
                  <b-tooltip label="Up Vote">
                    <b-icon
                      icon="thumb-up"
                      :type="getAgendaVoteStateClass('up')"
                      size="is-medium"
                      custom-class="pointer"
                    ></b-icon>
                  </b-tooltip>
                </div>
                <div class="is-block">
                  <hr>
                </div>
                <div class="is-block has-text-centered" @click="vote(-1)">
                  <b-tooltip label="Down Vote" position="is-bottom">
                    <b-icon
                      icon="thumb-down"
                      :type="getAgendaVoteStateClass('down')"
                      size="is-medium"
                      custom-class="pointer"
                    ></b-icon>
                  </b-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="break"></div>

          <div class="columns">
            <div class="column">
              <progress
                class="progress is-primary"
                :value="agenda.progress"
                max="100"
              >{{agenda.progress}}%</progress>
            </div>
            <div
              class="column is-narrow"
            >{{agenda.remainingDays}} days remaing({{agenda.progress || 0}}%)</div>
          </div>
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">
                  <b-icon icon="thumb-up" type="is-grey-lighter" size="is-small"></b-icon>Up Vote
                </p>
                <p class="title has-text-primary">{{agenda.upVote || 0}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">
                  <b-icon icon="thumb-down" type="is-grey-lighter" size="is-small"/>Down Vote
                </p>
                <p class="title">{{agenda.downVote || 0}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">
                  <b-icon icon="message" type="is-grey-lighter" size="is-small"></b-icon>FeedbackS
                </p>
                <p class="title has-text-success">{{agenda.numberOfFeedbacks || 0}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              &nbsp;&nbsp;
              <small
                v-if="$acl.hasPermission(agenda)"
                class="has-text-link pointer"
                @click="editAgenda"
              >EDIT</small>
              &nbsp;&nbsp;
              <small
                v-if="$acl.hasPermission(agenda)"
                class="has-text-danger pointer"
                @click="deleteAgenda"
              >DELETE</small>
            </div>
          </nav>
          <template v-if="agenda.files && agenda.files.length">
            <FilePreview
              v-for="(file,index) in agenda.files"
              :bucket="'post'"
              :key="index"
              :fileData="file"
            />
          </template>

          <div class="has-text-centered"></div>
          <feedback-input @success="handleNewFeedback($event)" :post-id="agendaId"/>
          <feedback-item
            class="media"
            v-for="(feedback,i) in agenda.feedbacks"
            :key="i"
            @deleted="handleDeleteSuccess(i)"
            :feedback="feedback"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AgendaAPI, AgendaVoteAPI } from '@/api';
import FeedbackItem from './FeedbackItem.vue';
import FeedbackInput from './FeedbackInput.vue';
import FilePreview from '@/components/FilePreview.vue';
import VueNextLevelScroll from 'vue-next-level-scroll';

export default {
  name: 'AgendaDetail',
  components: {
    FilePreview,
    FeedbackItem,
    FeedbackInput,
    VueNextLevelScroll
  },
  data() {
    return {
      agendaId: null,
      agenda: {
        category: {}
      },
      scrollTarget: 'null'
    };
  },
  created() {
    const { id } = this.$route.params;
    if (this.$route.query.scrollTarget) {
      this.scrollTarget = this.$route.query.scrollTarget;
    }
    this.agendaId = id;
    this.loadAgenda();
  },
  updated() {
    this.scrolltoTarget();
  },
  methods: {
    handleDeleteSuccess(index) {
      if (Number.isNaN(index) || !this.agenda || !this.agenda.feedbacks) return;
      this.agenda.feedbacks.splice(index, 1);
    },
    getAgendaVoteStateClass(type) {
      if (type === 'up') {
        return this.agenda.voted === 1 ? 'is-info' : 'is-grey-lighter';
      }
      if (type === 'down') {
        return this.agenda.voted === -1 ? 'is-info' : 'is-grey-lighter';
      }
      return '';
    },
    async handleNewFeedback(feedback) {
      if (!feedback) return;
      if (!this.agenda.feedbacks) {
        this.agenda.feedbacks = [feedback];
      } else {
        this.agenda.feedbacks.unshift(feedback);
      }
      this.agenda.numberOfFeedbacks += 1;
    },
    async loadAgenda() {
      this.agenda = await AgendaAPI.detail(this.agendaId);
    },
    async vote(vote) {
      const result = await AgendaVoteAPI.vote({
        postId: this.agenda.id,
        vote
      });
      if (result) {
        this.agenda.upVote = result.upVote;
        this.agenda.downVote = result.downVote;
        this.agenda.voted = result.voted;
      }

      if (result.upVote === 1) {
        this.$toast.open({
          message: 'Up voted',
          type: 'is-primary',
          position: 'is-top',
          duration: 500
        });
      } else if (result.downVote === 1) {
        this.$toast.open({
          message: 'Down voted',
          type: 'is-primary',
          position: 'is-top',
          duration: 500
        });
      } else {
        this.$toast.open({
          message: 'Vote cleared',
          type: 'is-primary',
          position: 'is-top',
          duration: 500
        });
      }
    },
    editAgenda() {
      this.$router.push({
        name: 'update-agenda',
        params: {
          agendaId: this.agendaId
        }
      });
    },
    async deleteAgenda() {
      this.$dialog.confirm({
        title: 'Deleting agenda',
        message:
          'Are you sure you want to <b>delete</b> the agenda? This action cannot be undone.',
        confirmText: 'Delete Agenda',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await AgendaAPI.remove(this.agenda.id);
          this.$toast.open({
            message: 'Agenda deleted successfully.',
            type: 'is-success',
            position: 'is-top'
          });
          this.$router.push({ name: 'agendas' });
        }
      });
    },
    scrolltoTarget() {
      const elem = this.$refs.scrollRef;
      elem.click();
    },
    openProfile(id) {
      this.$router.push({ name: 'profile', query: { userAccountId: id } });
    },
    backToAgendas() {
      this.$router.push({ name: 'agendas' });
    }
  },
  watch: {
    '$route.params.id': {
      handler(id) {
        this.agendaId = id;
        this.loadAgenda();
      }
    }
  }
};
</script>
<style scoped>
.has-text-centered {
  color: #593c79;
}
.category {
  margin-bottom: 20px;
}
.post-creater {
  color: #593c79;
  cursor: pointer;
}
.back {
  margin-left: 0px !important;
  cursor: pointer;
}
</style>

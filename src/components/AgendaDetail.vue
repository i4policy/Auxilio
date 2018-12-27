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
              <progress class="progress is-primary" value="15" max="100">15%</progress>
            </div>
            <div class="column is-narrow">21 days remaing</div>
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
          </nav>
          <div class="has-text-centered"></div>
          <feedback-input :post-id="agenda.id"/>
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
    async getAgenda(id) {
      this.agenda = await AgendaAPI.get(id);
    },
    async upVote() {
      console.log('av');
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
      console.log('a');
      await AgendaVoteAPI.vote({
        postId: this.agenda.id,
        vote: -1
      });
      this.$toast.open({
        message: 'Down votted',
        type: 'is-info',
        position: 'is-top'
      });
    }
  }
};
</script>

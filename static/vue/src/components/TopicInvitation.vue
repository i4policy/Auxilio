<template>
  <div style="padding-top:0.5em;">
    <div v-if="isLoading" class="columns is-centered spinner">
      <atom-spinner :animation-duration="1000" :size="60" :color="'rgb(255,255,255)'"/>
    </div>
  </div>
</template>

<script>
import { AgendaAPI } from '@/api';
import { AtomSpinner } from 'epic-spinners';

export default {
  name: 'TopicInvitation',
  components: {
    AtomSpinner
  },
  data() {
    return {
      mainTopicId: null,
      invitationHash: null
    };
  },
  created() {
    if (this.$route.params.invitationHash) {
      this.invitationHash = this.$route.params.invitationHash;
      this.confirmInvitation();
    }
    console.log(this.$route.params);
    console.log('-------------------');
  },
  watch: {
    '$route.params.invitationHash': {
      handler(invitationHash) {
        this.invitationHash = invitationHash;
        this.confirmInvitation();
      }
    }
  },
  methods: {
    async confirmInvitation() {
      console.log({ invitationHash: this.invitationHash });
      const result = await AgendaAPI.confirmInvitation({ invitationHash: this.invitationHash });

      const { mainTopicId } = result;
      this.$router.push({ name: 'agendas', query: { mainTopicId } });
    }
  },
};
</script>

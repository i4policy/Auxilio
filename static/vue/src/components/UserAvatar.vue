<template>
  <div class="image" v-bind:style="[{width: size + 'px'},{height: size + 'px'}]">
    <img
      :src="imgUrl"
      :class="{ 'is-rounded': isRounded }"
      v-img-fallback="'/user-placeholder.png'"
    >
    <span class="you" v-if="showMe">You</span>
  </div>
</template>

<script>
import { API_ROOT } from '@/api';

export default {
  name: 'UserAvatar',
  props: {
    bucket: {
      type: String,
      default: 'users'
    },
    fileName: {
      type: String,
      default: 'avatar_anonymous.png'
    },
    size: {
      type: Number,
      default: 50
    },
    showMe: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
    imgUrl() {
      if (!this.bucket || !this.fileName) {
        return false;
      }
      return `${API_ROOT}/Containers/${this.bucket}/download/${this.fileName}`;
    }
  },
  methods: {
  }
};
</script>

<style scooped>
.you {
  color: #593c79;
  padding: 17px;
}
.image {
  margin-right: 10px;
}
</style>

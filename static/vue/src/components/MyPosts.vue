<template>
    <div>
        <span v-if="!data.rows.length > 0" class="has-text-centered not-found">
            No Topic found.
        </span>
        <div class="card-links list-link" v-for="(post, i) in data.rows" :key="post.id" @click="$router.push({name: 'agenda-detail',params: { id: post.id }});">
            <!-- <i class="category-pill-small">3</i> -->
            <span class="post-title">
            {{i+1}}. {{ post.title | limitTo(30, '...')}}
            </span><br>
            <span class="post-date">
            {{ post.createdAt | formatDate }}
            </span>
        </div>
        <div v-if="!viewLessPosts && (data.count > 5)" class="card-links" @click="viewMorePosts()"><span> View more &rarr;</span></div>
        <div v-if="viewLessPosts" class="card-links" @click="getMyPosts()"><span> View less &rarr;</span></div>

    </div>
</template>
<script>
import { UserAccountAPI } from '@/api';

export default {
  name: 'MyPosts',
  data() {
    return {
      data: {
        rows: [],
        count: 0
      },
      viewLessPosts: false,
    };
  },
  props: {
    userId: {
      type: [String],
      default: () => ''
    }
  },
  created() {
    this.getMyPosts();
  },
  methods: {
    async getMyPosts() {
      this.data = await UserAccountAPI.getMyPosts(5, 0, this.userId);
      this.viewLessPosts = false;
    },
    async viewMorePosts() {
      this.data = await UserAccountAPI.getMyPosts(this.data.count, 0, this.userId);
      this.viewLessPosts = true;
    },
  }
};
</script>

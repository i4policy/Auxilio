<template>
  <div>
    <navbar/>
    <div class="container is-fluid">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'AppContent',
  components: {
    Navbar
  }
};
</script>
<style lang="sass">

@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>

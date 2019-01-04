<template>
  <div>
    <navbar/>
    <div class="container is-fluid">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
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
<style >
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>

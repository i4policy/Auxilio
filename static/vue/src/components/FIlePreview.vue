<template>
    <h3>preview</h3>
</template>

<script>
export default {
  props: {
    meta: {
      type: String,
      default: ''
    },
    file: {
      type: Object,
      default: () => null
    }
  },

};
</script>

<style>

</style>

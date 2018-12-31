<template>
  <div class="my-tag" :style="{ backgroundColor: bColor, color: fColor }">
      <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    bColor: {
      type: [Object, String],
      default: () => '#ffffff'
    }
  },
  data() {
    return {

    };
  },
  computed: {
    fColor() {
      const lighters = [9, 'a', 'b', 'c', 'd', 'e', 'f'];
      if (lighters.indexOf(this.bColor[1]) > -1) {
        return '#000000';
      }
      return '#ffffff';
    }
  }
};
</script>
<style>

.my-tag {
  border-style: none;
  box-shadow: 0 6px 9px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  margin: 0.1em 0.3em;
  padding: 5px 15px;
  border-radius: 1em;
  cursor: pointer;
  display: inline-block !important;
  font-size:1em;
  font-size:0.8em;
}
</style>

<template>
  <div>
      <div class="modal-card is-small
      ">
        <header
          class="modal-card-head has-text-centered"
          style="justify-content: center;"
        >
        <p class="modal-card-title">Delete</p>
        </header>
         <section class="modal-card-body">
        <div class="columns">
          <div class="column has-text-centered">
            <p>Are sure you want to delete?</p>
          </div>
        </div>
      </section>
        <footer class="modal-card-foot" style="justify-content: right;">
          <div class="is-pulled-right">
            <button class="button" type="button" @click="cancel">No</button>
            <button class="button is-primary" @click="yes">Yes</button>
          </div>
        </footer>
      </div>
  </div>
</template>

<script>

export default {
  name: 'ConfirmationDialog',
  methods: {
    cancel() {
      this.$emit('close');
    },
    yes() {
      this.$emit('close', true);
    }
  }
};
</script>

<style>
</style>

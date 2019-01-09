<template>
  <div>
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <img src="@/assets/logo.svg" style="height:60px">
            <p class="subtitle has-text-white">Reset your password.</p>
            <div class="box">
              <form @submit.prevent="reset" novalidate>
                <b-field
                  :type="{'is-danger': errors.has('email')}"
                  :message="errors.first('email')"
                >
                  <b-input
                    type="email"
                    v-model="item.email"
                    placeholder="Email"
                    name="email"
                    v-validate="'required|email'"
                    data-vv-validate-on="none"
                  ></b-input>
                </b-field>
                <button
                  class="button forgot-password-button is-block is-primary is-medium is-fullwidth"
                >Reset</button>
                <a href="#" class="login" @click.prevent="login()">Login</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { AuthService } from '@/services';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      item: {}
    };
  },
  methods: {
    async reset() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        await AuthService.reset(this.item.email);
        this.$router.push({ name: 'login' });
        this.$toast.open({
          message: 'Reset url is send via your email.',
          type: 'is-success',
          position: 'is-top'
        });
      } else {
        this.$toast.open({
          message: 'Form is not valid! Please check the fields.',
          type: 'is-danger',
          position: 'is-top'
        });
      }
    },
    login() {
      this.$router.push({ name: 'login' });
    },
  }
};
</script>
<style scooped>
.login {
  color: #593c79 !important;
}
.forgot-password-button {
  margin-bottom: 30px;
}
</style>

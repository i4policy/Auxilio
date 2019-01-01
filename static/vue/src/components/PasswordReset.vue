<template>
  <div>
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <img src="@/assets/logo.svg" style="height:60px">
            <p class="subtitle has-text-white">Change your password.</p>
            <div class="box">
              <form @submit.prevent="change" novalidate>
                <b-field
                  :type="{'is-danger': errors.has('email')}"
                  :message="errors.first('email')"
                >
                  <b-input
                    type="password"
                    v-model="item.newPassword"
                    placeholder="New Password"
                    name="newPassword"
                    v-validate="'required'"
                    data-vv-validate-on="none"
                  ></b-input>
                </b-field>
                <button
                  class="button change-password-button is-block is-primary is-medium is-fullwidth"
                >Change</button>
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
  name: 'PasswordReset',
  data() {
    return {
      item: {},
      resetToken: ''
    };
  },
  created() {
    const { resetToken } = this.$route.params;
    this.resetToken = resetToken;
  },
  methods: {
    async change() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        await AuthService.changePassword(
          this.resetToken,
          this.item.newPassword
        );
        this.$router.push({ name: 'login' });
        this.$toast.open({
          message: 'Password changed Succesfully.',
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
    }
  }
};
</script>
<style scooped>
.login {
  color: #593c79 !important;
}
.change-password-button {
  margin-bottom: 30px;
}
</style>

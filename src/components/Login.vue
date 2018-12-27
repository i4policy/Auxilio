<template>
  <div>
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <img src="@/assets/logo.svg" style="height:60px">
            <p class="subtitle has-text-white">Please login to proceed.</p>
            <div class="box">
              <form @submit.prevent="login" novalidate>
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
                <b-field
                  :type="{'is-danger': errors.has('password')}"
                  :message="errors.first('password')"
                >
                  <b-input
                    type="password"
                    v-model="item.password"
                    placeholder="Password"
                    name="password"
                    v-validate="'required'"
                  ></b-input>
                </b-field>
                <button class="button is-block is-primary is-medium is-fullwidth">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { AuthService } from '@/services/services.index';

export default {
  name: 'Login',
  data() {
    return {
      item: {}
    };
  },
  methods: {
    async login() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        await AuthService.login(this.item.email, this.item.password);
        this.$router.push({ name: 'agendas' });
      } else {
        this.$toast.open({
          message: 'Form is not valid! Please check the fields.',
          type: 'is-danger',
          position: 'is-top'
        });
      }
    }
  }
};
</script>

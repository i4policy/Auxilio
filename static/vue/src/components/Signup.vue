<template>
  <div>
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <img src="@/assets/logo.svg" style="height:60px">
            <p class="subtitle has-text-white">Create new account</p>
            <div class="box signup-box">
              <form @submit.prevent="signUp" novalidate>
                <!-- <b-field
                    :type="{'is-danger': errors.has('title')}"
                    :message="errors.first('title')"
                  >
                  <b-select v-model="item.title" v-validate="'required'" placeholder="Select title">
                      <option value="Mr.">
                           Mr.
                      </option>
                      <option value="Mrs.">
                           Mrs.
                      </option>
                  </b-select>
                  </b-field> -->
                  <b-field
                    :type="{'is-danger': errors.has('givenName')}"
                    :message="errors.first('givenName')"
                  >
                    <b-input
                      type="text"
                      v-model="item.givenName"
                      placeholder="Given Name"
                      name="givenName"
                      v-validate="'required'"
                      data-vv-validate-on="none"
                    ></b-input>
                  </b-field>
                  <b-field
                    :type="{'is-danger': errors.has('familyName')}"
                    :message="errors.first('familyName')"
                  >
                    <b-input
                      type="text"
                      v-model="item.familyName"
                      placeholder="Family Name"
                      name="familyName"
                      v-validate="'required'"
                      data-vv-validate-on="none"
                    ></b-input>
                  </b-field>
                  <b-field
                    :type="{'is-danger': errors.has('organization')}"
                    :message="errors.first('organization')"
                  >
                    <b-input
                      type="text"
                      v-model="item.organization"
                      placeholder="Organization"
                      name="organization"
                      v-validate="'required'"
                      data-vv-validate-on="none"
                    ></b-input>
                  </b-field>
                  <!-- <b-field
                    :type="{'is-danger': errors.has('position')}"
                    :message="errors.first('position')"
                  >
                    <b-input
                      type="text"
                      v-model="item.position"
                      placeholder="Position"
                      name="position"
                      v-validate="'required'"
                      data-vv-validate-on="none"
                    ></b-input>
                  </b-field> -->
                  <b-field
                    :type="{'is-danger': errors.has('country')}"
                    :message="errors.first('country')"
                  >
                    <country-select v-model="item.country" :country="country" topCountry="US" class="country-select"/>
                  </b-field>
                  <b-field
                    :type="{'is-danger': errors.has('phoneNumber')}"
                    :message="errors.first('phoneNumber')"
                  >
                  <vue-tel-input v-model="item.phoneNumber"
                                  @onInput="onPhoneInput"
                                  :preferredCountries="['et', 'us', 'gb', 'ua']">
                  </vue-tel-input>
                  </b-field>
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
                      ref="password"
                    ></b-input>
                  </b-field>

                  <b-field
                    :type="{'is-danger': errors.has('confirmPassword')}"
                    :message="errors.first('confirmPassword')"
                  >
                    <b-input
                      type="password"
                      v-model="item.confirmPassword"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      v-validate="'required|confirmed:password'"
                      data-vv-as="password"
                    ></b-input>
                  </b-field>

                <button class="button login-button is-block is-primary is-medium is-fullwidth">Sign up</button>
                Already have an account? <a href="#" class="login" @click.prevent="login()">Login</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { UserAccountAPI } from '@/api';

export default {
  name: 'SignUp',
  data() {
    return {
      item: {},
      country: ''
    };
  },
  methods: {
    async signUp() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        delete this.item.confirmPasswordd;
        await UserAccountAPI.registerMember(this.item);
        this.$router.push({ name: 'login' });
        this.$toast.open({
          message: 'Successfuly registered, you will be able to login once approved by the administrator.',
          type: 'is-success',
          position: 'is-top',
          duration: 3000
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
    onPhoneInput({ number, isValid, country }) {
      console.log(number, isValid, country);
    }
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
.signup-box {
  width: 400px;
}
.country-select {
  width: 100%;
  height: 50px;
  background: white;
  border-radius: 5px;
  outline: none;
}
</style>

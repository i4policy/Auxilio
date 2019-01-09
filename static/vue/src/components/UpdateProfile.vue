<template>
  <div>
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h1 class="subtitle has-text-white">Update your account</h1>
            <div class="box">
              <form @submit.prevent="update" novalidate>
                <b-field
                  :type="{'is-danger': errors.has('title')}"
                  :message="errors.first('title')"
                >
                  <b-input
                    type="title"
                    v-model="item.title"
                    placeholder="Title"
                    name="title"
                    v-validate="'required'"
                    data-vv-validate-on="none"
                  ></b-input>
                </b-field>
                <b-field
                  :type="{'is-danger': errors.has('name')}"
                  :message="errors.first('name')"
                >
                  <b-input
                    type="name"
                    v-model="item.fullName"
                    placeholder="Name"
                    name="name"
                    v-validate="'required'"
                    data-vv-validate-on="none"
                  ></b-input>
                </b-field>
                <b-field
                  :type="{'is-danger': errors.has('phoneNumber')}"
                  :message="errors.first('phoneNumber')"
                >
                  <b-input
                    type="number"
                    v-model="item.phoneNumber"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    v-validate="'required'"
                    data-vv-validate-on="none"
                  ></b-input>
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
                  :type="{'is-danger': errors.has('oldPassword')}"
                  :message="errors.first('oldPassword')"
                >
                  <b-input
                    type="password"
                    v-model="item.oldPassword"
                    placeholder="Old password"
                    name="oldPassword"
                    data-vv-validate-on="none"
                  ></b-input>
                </b-field>

                <b-field
                  :type="{'is-danger': errors.has('newPassword')}"
                  :message="errors.first('newPassword')"
                >
                  <b-input
                    type="password"
                    v-model="item.newPassword"
                    placeholder="New Password"
                    name="newPassword"
                    v-validate="''"
                  ></b-input>
                </b-field>
                <button class="button login-button is-block is-primary is-medium is-fullwidth">Update</button>
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
import { UserAccountAPI } from '@/api';

export default {
  name: 'UpdateProfile',
  data() {
    return {
      item: {}
    };
  },
  methods: {
    async update() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        delete this.item.role;
        const result = await UserAccountAPI.updatMyProfile(this.item);
        if (result.tokenId) {
          AuthService.updateToken(result.tokenId);
        }
        this.$router.push({ name: 'profile' });
        this.$toast.open({
          message: 'Profile updated successfully.',
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
  },
  created() {
    this.item = AuthService.getProfile();
  }
};
</script>
<style scooped>
.forgot-password {
  color: #593c79 !important;
}
.login-button {
  margin-bottom: 30px;
}
</style>

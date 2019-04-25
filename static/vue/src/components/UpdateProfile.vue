<template>
  <div>
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <h1 class="subtitle has-text-white">Update your profile.</h1>
            <div class="box columns">
              <div class="column is-4">
                <ProfilePictureUpload
                  :preview="item.profilePicture"
                  @onUploadComplete="item.profilePicture = $event"
                />
              </div>
              <form @submit.prevent="update" novalidate class="column">
                <!-- <b-field
                  :type="{'is-danger': errors.has('title')}"
                  :message="errors.first('title')"
                >
                  <b-select v-model="item.title" v-validate="'required'" placeholder="Select title">
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
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
                <!-- <b-field
                  :type="{'is-danger': errors.has('phoneNumber')}"
                  :message="errors.first('phoneNumber')"
                >
                  <vue-tel-input
                    v-model="item.phoneNumber"
                    @onInput="onPhoneInput"
                    :preferredCountries="['et', 'us', 'gb', 'ua']"
                  ></vue-tel-input>
                </b-field> -->
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
                <button
                  class="button login-button is-block is-primary is-medium is-fullwidth"
                >Update</button>
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
import 'vue-tel-input/dist/vue-tel-input.css';

export default {
  name: 'UpdateProfile',
  data() {
    return {
      item: {},
      country: ''
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
          AuthService.updateProfilePicture(result.profilePicture);
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
    onPhoneInput({ number, isValid, country }) {
      console.log(number, isValid, country);
    }
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
input::placeholder {
  color: #666 !important;
  font-size: 1em;
  font-style: italic;
}
.country-select {
  width: 100%;
  height: 50px;
  background: white;
  border-radius: 5px;
  outline: none;
}
</style>

<template>

  <!-- <b-row class="login_border"> -->
  <b-row>
    <b-col md="6" class="m-md-auto shadow rounded p-4 white_bg">

      <h1 class="display-4 mb-4">Login</h1>
      <!-- Show error if email and password don't match -->
      <b-alert show variant="warning" v-if="err && err.errors.authfailed">{{ err.errors.authfailed }}</b-alert>
      <b-form v-on:submit.prevent="onSubmit">
        <!-- Email -->
        <b-form-group label="Email address:" label-for="email">
          <b-form-input id="email" v-model="email" :class="[err && err.errors.email ? 'is-invalid' : '']" type="email" placeholder="Enter email"></b-form-input>
          <!-- Show error if email field is blank -->
          <div v-if="err && err.errors.email" class="invalid-feedback">
            {{ err.errors.email }}
          </div>
        </b-form-group>
        <!-- Password -->
        <b-form-group label="Password:" label-for="password">
          <b-form-input id="password" v-model="password" :class="[err && err.errors.password ? 'is-invalid' : '']" type="password" placeholder="Enter password"></b-form-input>
          <!-- Show error if password field is blank -->
          <div v-if="err && err.errors.password" class="invalid-feedback">
            {{ err.errors.password }}
          </div>
        </b-form-group>
        <!-- Submit -->
        <b-button type="submit" class="mb-3">Submit</b-button>
      </b-form>

    </b-col>
  </b-row>

</template>

<script>
import * as auth from '../services/AuthService'
export default {
  name: 'login',
  metaInfo: {
    title: 'Login'
  },
  data: function() {
    return {
      email: "",
      password: "",
      err: ""
    };
  },
  methods: {
    onSubmit: async function() {
      const user = {
        email: this.email,
        password: this.password
      };
      await auth.login(user).catch((error => {this.err = error.response.data}));
      if (this.$store.state.isLoggedIn) {
        this.$router.push({ name: 'home' });
        this.flash(`Logged in as ${this.$store.state.username}`, "success");
      }
    }
  }
};
</script>

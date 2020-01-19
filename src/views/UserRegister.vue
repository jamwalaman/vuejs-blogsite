<template>
<b-row>
  <b-col md="6" class="m-md-auto shadow rounded p-4 white_bg">

    <h1 class="display-4 mb-4">Register</h1>
    <p class="lead">Register to create and manage your blogs. All fields are required.</p>
    <b-form v-on:submit.prevent="onSubmit">
      <!-- Email -->
      <b-form-group label="Email address:" label-for="email" description="You won't be getting any emails. This is just what you use to login">
        <b-form-input id="email" v-model="email" :class="[err && err.errors.email ? 'is-invalid' : '']" type="email" placeholder="Enter email"></b-form-input>
        <!-- Show errors for email field -->
        <div v-if="err && err.errors.email" class="invalid-feedback">
          {{ err.errors.email }}
        </div>
      </b-form-group>
      <!-- Username -->
      <b-form-group label="Username:" label-for="username" description="Your public username. Only numbers and letters - with no space - are allowed">
        <b-form-input id="username" v-model="username" :class="[err && err.errors.username ? 'is-invalid' : '']" placeholder="Enter a username"></b-form-input>
        <!-- Show errors for username -->
        <div v-if="err && err.errors.username" class="invalid-feedback">
          {{ err.errors.username }}
        </div>
      </b-form-group>
      <!-- Password -->
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="password" :class="[err && err.errors.password ? 'is-invalid' : '']" type="password" placeholder="Enter password"></b-form-input>
        <!-- Show errors for password -->
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
  name: 'register',
  metaInfo: {
    title: 'Register'
  },
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
      err: ''
    }
  },
  methods: {
    onSubmit: async function() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      auth.registerUser(user).then(res => {
        this.$router.push({name: 'login'});
        this.flash(res.data.msg, "success");
      }).catch((error => {
        this.err = error.response.data
      }));
    }
  }
}
</script>

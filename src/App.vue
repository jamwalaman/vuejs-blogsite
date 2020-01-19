<template>
<div id="app">

  <!-- Navbar starts -->
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-container>
      <!-- Site name -->
      <b-navbar-brand :to="{name: 'home'}">Blogsite</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'home'}" exact>Home</b-nav-item>
          <b-nav-item :to="{name: 'blogs'}" exact>All Blogs</b-nav-item>
          <b-nav-item v-if="!$store.state.isLoggedIn" :to="{name: 'login'}" exact>Login</b-nav-item>
          <b-nav-item v-if="!$store.state.isLoggedIn" to="/register" exact>Register</b-nav-item>
          <b-nav-item v-if="$store.state.isLoggedIn" to="/create" exact>Create</b-nav-item>
          <b-nav-item-dropdown v-if="$store.state.isLoggedIn">
            <template v-slot:button-content>
              <em>Hi {{ $store.state.username }}</em>
            </template>
            <b-dropdown-item v-on:click.prevent="logout()" href="#">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

    </b-container>
  </b-navbar>
  <!-- Flash messages for when users login, logout or manage their blog -->
  <b-container class="py-4">
    <div class="row justify-content-center">
      <flash-message class="col-auto"></flash-message>
    </div>
    <!-- Views container starts here -->
    <router-view />
  </b-container>

</div>
</template>
<script>
import * as auth from "./services/AuthService";
export default {
  name: 'app',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Deafult',
    // all titles will be injected into this template
    titleTemplate: '%s | Blogsite'
  },
  methods: {
    logout: function() {
      auth.logout();
      this.flash("Logout successful", "success");
      if (this.$route.path != '/') {
        this.$router.push({
          name: 'home'
        });
      }
    }
  },
  beforeCreate: function() {
    // Ensure that on app boot, we check if the user is authenticated or not
    this.$store.dispatch("authenticate");
  }
};
</script>

import Vue from "vue";
import Vuex from "vuex";
import * as auth from "./services/AuthService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    // localhost for development mode and heroku for production
    apiURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://aman-blog-restapi.herokuapp.com/api'
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if (state.isLoggedIn) {
        state.username = auth.getUsername();
        state.userId = auth.getUserId();
      } else {
        state.userId = null;
        state.username = null;
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit("authenticate");
    }
  }
});

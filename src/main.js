import Vue from 'vue'
import App from './App.vue'
import VueFlashMessage from "vue-flash-message"
import VueMeta from 'vue-meta'
import vueHeadful from 'vue-headful'
import moment from 'moment'
import router from './router'
import store from './store'
import '@/assets/css/customStyle.css'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require("vue-flash-message/dist/vue-flash-message.min.css");

Vue.use(VueFlashMessage, {
  messageOptions: {
    // All flah messages will destroyed after 3 seconds
    timeout: 3000
  }
});

Vue.use(BootstrapVue)
Vue.use(VueMeta)
Vue.component('vue-headful', vueHeadful)

Vue.config.productionTip = false

Vue.filter('timefromnow', (value) => {
  if (!value) {
    return '';
  }
  return moment(moment(value).toArray()).fromNow()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

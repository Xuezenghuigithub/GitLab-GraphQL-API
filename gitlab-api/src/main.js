import Vue from 'vue'
import App from './App.vue'
import router from './router'
import apolloProvider from "./vue-apollo";
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  apolloProvider,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

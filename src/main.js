import Vue from 'vue'
import App from './App.vue'


import router from "./router"
import vuetify from './plugins/vuetify';
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/global/global.scss'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.prototype.$axios = axios
Vue.config.devtools = true
Vue.config.debug = true
console.log(Vue.version)
Vue.use(vuetify)


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

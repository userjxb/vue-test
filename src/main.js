import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import 'utils/rem'
import 'assets/stylesheets/reset.css'
import 'mint-ui/lib/style.css'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,store,
  render: h => h(App),
}).$mount('#app')

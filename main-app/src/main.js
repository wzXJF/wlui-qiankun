import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun'
import microApps from './assets/js/appList.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

registerMicroApps(microApps, {
  beforeLoad: app => {
    console.log(app.name)
  },
  beforeMount: [
    app => {
      console.log(app.name)
    }
  ],
  afterMount: [
    app => {
      console.log(app.name)
    }
  ],
  afterUnmount: [
    app => {
      console.log(app.name)
    }
  ]
})

start()

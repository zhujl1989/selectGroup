import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/iconfont.js';
import './assets/css/iconfont.css';
import message from '@/plugin/index'
Vue.config.productionTip = false
Vue.use(message)

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

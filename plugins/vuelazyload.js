import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preload: 1.3,
  error: require('../static/images/404.png'),
  loading: require('../static/images/load.png'),
  attempt: 1
})

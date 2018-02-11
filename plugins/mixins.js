import Vue from 'vue'
import htpl from '~/utils/httpUtil'

const mixinConfig = {
  methods: {
    jump (to) {
      if (this.$router) this.$router.push(to)
    },
    apiPost (url, body) {
      return htpl.httpStreamPost(url, body)
    }
  }
}

Vue.mixin(mixinConfig)
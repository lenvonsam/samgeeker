import Vue from 'vue'
import htpl from '~/utils/httpUtil'

const mixinConfig = {
  methods: {
    jump(to) {
      if (this.$router) this.$router.push(to)
    },
    back() {
      if (this.$router) this.$router.go(-1)
    },
    apiPost(url, body) {
      return htpl.httpStreamPost(url, body)
    },
    apiGet(url) {
      return htpl.httpGet(url)
    }
  }
}

Vue.mixin(mixinConfig)

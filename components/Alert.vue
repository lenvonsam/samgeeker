<template lang="pug">
transition(name="slide",enter-active-class="slideInDown",leave-active-class="slideOutUp")
  .alert.alert-dismissible(:class="'alert-' + type", ref="samAlert", :style="{left: width + 'px' }", v-if="value")
    strong {{title}}
    span {{content}}
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    title: {
      type: String,
      default: '友情提示'
    },
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'danger'
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      width: 100
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.width = (document.body.clientWidth - this.$refs.samAlert.clientWidth) / 2
        })
      } else {
        this.width = 0
      }
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.show = true
    //     this.$nextTick(() => {
    //       this.width = (document.body.clientWidth - this.$refs.samAlert.clientWidth) / 2
    //       setTimeout(() => {
    //         this.show = false
    //       }, 200 + this.duration)
    //     })
    // }, 200)
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  z-index: 1031;
  top: 10px;
  width: auto;
  border-radius: 0px;
}
.alert span {
  margin-left: 10px;
}
</style>

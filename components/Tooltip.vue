<template lang="pug">
  .sam-tooltip(@mouseover="show = true", @mouseout="show = false")
    transition(name="fade",enter-active-class="fadeIn",leave-active-class="fadeOut")
      .title-wrapper(:class="placement", v-show="show")
        .title {{title}}
    slot
</template>

<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'right'
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.sam-tooltip {
  display: inline-block;
  position: relative;
}
.sam-tooltip:hover {
  cursor: pointer;
}
.sam-tooltip .title-wrapper {
  position: absolute;
  z-index: 20;
}
.sam-tooltip .title-wrapper.left {
  top: -5px;
  left: -70px;
}
.sam-tooltip .title-wrapper.right {
  right: -63px;
  top: -5px;
}
.sam-tooltip .title-wrapper.top {
  top: -30px;
  left: -20px;
}
.sam-tooltip .title-wrapper.bottom {
  bottom: -30px;
  left: -20px;
}
.sam-tooltip .title-wrapper .title {
  position: relative;
  background: #000;
  display: inline-block;
  color: #fff;
  padding: 5px 0px;
  font-size: 12px;
  width: 60px;
  text-align: center;
  border-radius: 3px;
}
.sam-tooltip .title-wrapper.left .title:after,
.sam-tooltip .title-wrapper.right .title:before,
.sam-tooltip .title-wrapper.top .title:before,
.sam-tooltip .title-wrapper.bottom .title:before {
  position: absolute;
  content: "";
  border: 5px solid transparent;
}

.sam-tooltip .title-wrapper.left .title:after {
  border-left: 5px solid #000;
  right: -10px;
  top: 6px;
}
.sam-tooltip .title-wrapper.right .title:before {
  border-right: 5px solid #000;
  top: 6px;
  left: -10px;
}
.sam-tooltip .title-wrapper.top .title:before {
  border-top: 5px solid #000;
  bottom: -10px;
  left: 24px;
}
.sam-tooltip .title-wrapper.bottom .title:before {
  border-bottom: 5px solid #000;
  top: -10px;
  left: 24px;
}
</style>
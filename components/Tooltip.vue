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

<style lang="scss", scoped>
  .sam-tooltip {
    display: inline-block;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    .title-wrapper {
      position: absolute;
      z-index: 20;
      &.left {
        top: -5px;
        left: -70px;
      }
      &.right {
        right: -63px;
        top: -5px;
      }
      &.top {
        top: -30px;
        left: -20px;
      }
      &.bottom {
        bottom: -30px;
        left: -20px;
      }
      .title {
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
      &.left .title:after,
      &.right .title:before,
      &.top .title:before,
      &.bottom .title:before {
        position: absolute;
        content: '';
        border: 5px solid transparent;
      }

      &.left .title:after {
        border-left: 5px solid #000;
        right: -10px;
        top: 6px;
      }
      &.right .title:before {
        border-right: 5px solid #000;
        top: 6px;
        left: -10px;
      }
      &.top .title:before {
        border-top: 5px solid #000;
        bottom: -10px;
        left: 24px;
      }
      &.bottom .title:before {
        border-bottom: 5px solid #000;
        top: -10px;
        left: 24px;
      }
    }
  }
</style>
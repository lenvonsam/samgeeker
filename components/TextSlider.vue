<template lang="pug">
  .banner(style="position:relative;", ref="box")
    .content.clearfix
      .text-item(v-for="(pearl,index) in mainPearls",:style="{left: itemLeft(index)}")
        .item-desc.text-center {{pearl.title}}
        .item-desc.text-right -- {{pearl.author}}
    .dots
      .text-right(style="padding-right:10%")
        .dot(v-for="(p,i) in mainPearls", :class="{active: i==currentIndex}", @click="currentIndex = i")
</template>

<script>
  import { mapState } from 'vuex'
  // ,v-touch:swipe="txtSliderSwipe"
  export default {
    data () {
      return {
        currentIndex: 0,
        screenWidth: 800
      }
    },
    computed: {
      ...mapState({
        mainPearls: state => state.mainPearls
      })
    },
    methods: {
      itemLeft (i) {
        // let screenWidth = window.screen.width
        if (i === this.currentIndex) {
          return '0px'
        } else if (i < this.currentIndex) {
          return `-${this.screenWidth}px`
        } else {
          return `${this.screenWidth}px`
        }
      },
      sliderStart () {
        const me = this
        this.timer = setInterval(() => {
          me.currentIndex++
          if (me.currentIndex > (me.mainPearls.length - 1)) {
            me.currentIndex = 0
          }
        }, 5000)
      },
      txtSliderSwipe (type, e) {
        const me = this
        if (type === 'swiperight') {
          me.currentIndex--
          if (me.currentIndex < 0) {
            me.currentIndex = me.mainPearls.length - 1
          }
        } else if (type === 'swipeleft') {
          me.currentIndex++
          if (me.currentIndex > (me.mainPearls.length - 1)) {
            me.currentIndex = 0
          }
        }
      }
    },
    mounted () {
      const me = this
      this.$nextTick(() => {
        this.screenWidth = this.$refs.box.clientWidth
        me.sliderStart()
      })
    },
    beforeDestroy () {
      this.timer && clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  .banner {
    min-height: 700px;
    background: url('http://osuptraav.bkt.clouddn.com/headbg.jpg') no-repeat center center;
    background-size: cover;
    width:100%;
    padding-top:20%;
  }

  .banner .content{
    position:relative;
    overflow-x:hidden;
    min-height:200px;
  }

  .banner .content .text-item {
    position:absolute;
    color:#fff;
    top:0px;
    width:100%;
    transition: all 1s;
  }

  .banner .content .text-item .item-desc:first-child {
    padding: 10px 10px;
    font-size: 24px;
  }

  .banner .content .text-item .item-desc:last-child {
    padding-right:10%;
  }

  .banner .dots {
    position:absolute;
    bottom:20%;
    color:#fff;
    left:0px;
    right:0px;
  }

  .banner .dots .dot {
    display:inline-block;
    height:10px;
    width:10px;
    border:2px solid #fff;
    border-radius:50%;
    margin-right:10px;
  }

  .banner .dots .dot:last-child {
    margin-right: 0px;
  }

  .banner .dots .dot.active {
    background:#fff;
  }

  @media(max-width: 480px) {
    .banner {
      min-height:270px;
      padding-top:30%;
    }
    .banner .content .text-item .item-desc:first-child {
      font-size: 16px;
    }
  }

  @media(max-width: 640px) {
    .banner {
      min-height: 302px;
    }
  }

  @media(max-width: 768px) {
    .banner {
      min-height: 400px;
    }
  }


</style>

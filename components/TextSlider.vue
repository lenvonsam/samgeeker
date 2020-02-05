<template lang="pug">
  .banner(style="position:relative;", ref="box")
    .bottom
      .content.clearfix
        .wrap
        .text-item(v-for="(pearl,index) in mainPearls",:style="{left: itemLeft(index)}")
          .item-desc.text-center {{pearl.title}}
          .item-desc.text-right.mt-10 -- {{pearl.author}}
    //- .dots
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
      screenWidth: 800,
      direction: 'right'
    }
  },
  computed: {
    ...mapState({
      mainPearls: state => state.mainPearls
    })
  },
  methods: {
    itemLeft (i) {
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
        if (me.direction === 'left') {
          me.currentIndex++
          if (me.currentIndex > (me.mainPearls.length - 1)) {
            me.direction = 'right'
          }
        }
        if (me.direction === 'right') {
          me.currentIndex--
          if (me.currentIndex < 0) {
            me.currentIndex = 0
            me.direction = 'left'
          }
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
.mt-10 {
  margin-top: 10px;
}
.banner {
  height: 500px;
  background: url("http://commfile.thinkingsam.cn/banner.jpg") no-repeat center
    center;
  background-size: cover;
  width: 100%;
  overflow: hidden;
  /* padding-top: 30%; */
}

.banner > .bottom {
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 180px;
  right: 0;
  overflow: hidden;
}

.banner .content {
  position: relative;
  overflow: hidden;
  height: 100%;
  padding-top: 15%;
  bottom: 0px;
  z-index: 10px;
}

.banner .content > .wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}

.banner .content .text-item {
  position: absolute;
  color: #fff;
  top: 12%;
  width: 100%;
  transition: all 1s;
}

.banner .content .text-item .item-desc:first-child {
  padding: 15px 15px;
  font-size: 24px;
}

.banner .content .text-item .item-desc:last-child {
  padding-right: 10%;
  font-size: 18px;
}

.banner .dots {
  position: absolute;
  bottom: 12%;
  color: #fff;
  left: 0px;
  right: 0px;
}

.banner .dots .dot {
  display: inline-block;
  height: 10px;
  width: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-right: 10px;
}

.banner .dots .dot:last-child {
  margin-right: 0px;
}

.banner .dots .dot.active {
  background: #fff;
}

@media (max-width: 480px) {
  .banner {
    min-height: 270px;
    padding-top: 30%;
  }
  .banner .content .text-item .item-desc:first-child {
    font-size: 16px;
  }
  .banner .content .text-item .item-desc:last-child {
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .banner {
    min-height: 302px;
  }
  .banner .content {
    padding-top: 5%;
  }
  .banner .content .text-item .item-desc:first-child {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .banner {
    min-height: 400px;
  }
  .banner .content {
    padding-top: 5%;
  }
  .banner .content .text-item .item-desc:first-child {
    font-size: 20px;
  }
}
</style>

<template lang="pug">
  #appFrame
    page-load(v-model="spinnerShow")
    alert(:content="alertText", v-model="alertShow", :type="alertType")
    .navbar.header.navbar-fixed-top
      .container-fluid
        .navbar-header
          button.navbar-toggle.collapsed(data-toggle="collapse", data-target="#samHeadCollapse", aria-expanded="false")
            span.sr-only
            span.icon-bar
            span.icon-bar
            span.icon-bar
          a.navbar-brand.sam-brand
            img.img-responsive.img-circle(src="~/static/images/samlogo.png")
            | 山姆极客
        #samHeadCollapse.collapse.navbar-collapse
          ul.nav.navbar-nav.navbar-right
            li(v-for="(t,i) in mainTitleArray", @click="topbarJump(t)")
              a(:class="{active: t.url.path == routePath}") {{t.name}}
    nuxt
    .footer
      .row
        .col-md-10.col-md-offset-1
          .row(style="margin-top:15px;")
            .col-md-4.col-sm-4
              h4 订阅动态
              p 山姆极客新动态及时通知您
              .form-inline(style="margin-top:2%;")
                .form-group
                  .input-group
                    input.form-control(style="border:0px;", v-model="orderMail")
                    .input-group-addon(style="border:0px;background-color:rgba(111, 232, 176,0.6)", @click="emailOrder")
                      i.glyphicon.glyphicon-envelope(style="color:#fff;")
            .col-md-4.col-sm-4
              h4 联系地址
              p(v-for="addr in mainAddr") {{addr.name}}: {{addr.content}}
            .col-md-4.col-sm-4
              h4 关注山姆
              p.follows(style="font-size:32px;")
                i.fa(v-for="follow in mainFollows",@click="jumpToNewWindow(follow.url)",:class="follow.className")
              p
                | 山姆极客&nbsp;
                i.glyphicon.glyphicon-copyright-mark
                | &nbsp;2020
              p
                a(href="http://www.miitbeian.gov.cn", target="_blank") 苏ICP备17013255号

    transition(name="fade",enter-active-class="fadeInUp",leave-active-class="fadeOutDown")
      .back-to-top(v-if="canShowBottomBtn", v-scroll-to="{ el: '#appFrame' }")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import alert from '~/components/Alert.vue'
import pageLoad from '~/components/PageLoad.vue'
export default {
  data () {
    return {
      canShowBottomBtn: false,
      alertShow: false,
      alertText: '',
      alertType: 'danger',
      orderMail: ''
    }
  },
  components: {
    alert,
    pageLoad
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll, false)
    })
  },
  watch: {
    '$route': {
      handler (newVal, oldVal) {
        if (this.$route.query.type && this.$route.query.type === 'life') {
          this.$scrollTo('#samLife')
        } else {
          this.$scrollTo('#appFrame')
        }
      },
      deep: true
    },
    'alertShow': {
      handler (newVal, oldVal) {
        if (newVal) {
          const me = this
          setTimeout(() => {
            me.alertShow = false
          }, 3000)
        }
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, false)
  },
  computed: {
    ...mapState({
      mainTitleArray: state => state.mainTitleArray,
      mainAddr: state => state.mainAddr,
      mainFollows: state => state.mainFollows,
      spinnerShow: state => state.spinnerShow
    }),
    routePath () {
      if (this.$route.query.type) {
        return this.$route.path + '?type=' + this.$route.query.type
      } else if (this.$route.path === '/gallery/detail') {
        return '/gallery'
      } else {
        return this.$route.path
      }
    }
  },
  methods: {
    ...mapActions([
      'configKeyVal'
    ]),
    topbarJump (obj) {
      obj.outlink ? this.jumpToNewWindow(obj.url.path) : this.jump(obj.url)
    },
    jumpToNewWindow (url) {
      window.open(url, '_blank')
    },
    handleScroll () {
      this.canShowBottomBtn = window.scrollY > 60
    },
    async emailOrder () {
      const me = this
      let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.orderMail.trim() === '') {
        this.alertShow = !this.alertShow
        this.alertText = '邮箱不能为空'
      } else if (!emailReg.test(this.orderMail)) {
        this.alertShow = !this.alertShow
        this.alertText = '请输入正确的邮箱'
      } else {
        this.configKeyVal({ key: 'spinnerShow', val: true })
        try {
          let { data } = await this.apiPost('/backend/sendEmail', { title: '山姆订阅', content: `<p>订阅者: ${me.orderMail}</p>` })
          this.configKeyVal({ key: 'spinnerShow', val: false })
          if (data.returnCode === 0) {
            this.alertText = '感谢您订阅山姆极客'
            this.alertType = 'success'
          } else {
            this.alertText = data.errMsg
            this.alertType = 'danger'
          }
          this.alertShow = !this.alertShow
        } catch (err) {
          console.log(err)
          this.configKeyVal({ key: 'spinnerShow', val: false })
          this.alertText = '网络异常'
          this.alertType = 'danger'
          this.alertShow = !this.alertShow
        }
      }
    }
  }
}
</script>

<style>
@import url("../assets/scss/main.css");
.header {
  background-color: rgba(111, 232, 176, 0.6);
  border: 0px;
}
.header .sam-brand {
  color: #fff;
  font-weight: bold;
  letter-spacing: 4px;
  font-size: 20px;
}

.header .sam-brand img {
  height: 30px;
  width: 30px;
  display: inline-block;
  margin-right: 5px;
  margin-top: -5px;
  margin-left: -5px;
}
.footer {
  background-color: black;
  color: #fff;
}

.footer a {
  color: #fff;
}

.footer .follows i.fa {
  margin-right: 15px;
}

.footer .follows i.fa:hover {
  cursor: pointer;
  color: rgba(111, 232, 1, 0.6);
}
.back-to-top {
  position: fixed;
  z-index: 100;
  bottom: 2%;
  right: 2%;
  width: 36px;
  height: 50px;
  background: url(~/static/images/b_dot.jpg) no-repeat;
  background-color: transparent;
  border-radius: 4px;
}

.back-to-top:hover {
  cursor: pointer;
}

#appFrame .header li a.active {
  color: #030303;
}
</style>

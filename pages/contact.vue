<template lang="pug">
.content.container
  .row
    ol.breadcrumb.border-bottom-line
      li 首页
      li.active  联系山姆
  .row
    .col-sm-6
      .form-group
        label 称呼(必填)
        input.form-control(v-model="newUser.name")
      .form-group
        label 邮箱(必填)
        input.form-control(v-model="newUser.email",type="email",required)
      .form-group
        label 标题(必填)
        input.form-control(v-model="newUser.subject")
    .col-sm-6
      .form-group
        label 内容(必填)
        textarea.form-control(rows="6", v-model="newUser.body")
      .form-group.text-right
        button.btn.btn-primary(style="background:rgb(111,232, 176);border:0px;", @click="sendFeedback")
          | 立即发送
          i.fa.fa-send(style="margin-left:5px;")

  .contact-banner
    .row.text-center(style="margin-bottom:15px")
      h3 服务至上,创造优先
    .row
      .col-sm-4(v-for="cb in contactBanners")
        .box-grid(v-html="cb.content",style="height:133px")
        .row(style="margin-top:20px;")
          .col-sm-6
            img.img-responsive.img-circle(v-lazy="cb.url",style="height:145px;")
          .col-sm-6(style="padding-top:15px;")
            h3 {{cb.name}}
            p {{cb.intro}}
  alert.sam-alert.text-center(:type="alertType", v-model="alertShow", :content="alertText")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import alert from '~/components/Alert.vue'
export default {
  data () {
    return {
      newUser: {},
      alertType: 'success',
      alertShow: false,
      alertText: ''
    }
  },
  components: {
    alert
  },
  methods: {
    ...mapActions([
      'validateNull',
      'configKeyVal'
    ]),
    closeAlert () {
      const me = this
      setTimeout(function () {
        me.alertShow = false
      }, 3000)
    },
    clearInput () {
      this.newUser.name = ''
      this.newUser.email = ''
      this.newUser.subject = ''
      this.newUser.body = ''
    },
    sendFeedback () {
      const requireParam = {
        name: this.newUser.name,
        email: this.newUser.email,
        subject: this.newUser.subject,
        body: this.newUser.body
      }
      const me = this
      var content = `<p>称呼: ${this.newUser.name}</p><p>邮箱: ${this.newUser.email}</p><p>标题: ${this.newUser.subject}</p><p>内容: ${this.newUser.body}</p>`
      console.log(content)
      let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      me.alertShow = false
      this.validateNull(requireParam).then(resp => {
        if (resp && emailReg.test(me.newUser.email)) {
          me.apiPost('/backend/sendEmail', { title: '联系山姆', content }).then(({ data }) => {
            if (data.returnCode === 0) {
              me.alertText = '感谢您的建议，山姆稍后会联系您'
              me.alertType = 'warning'
            } else {
              me.alertText = data.errMsg
              me.alertType = 'danger'
            }
            me.alertShow = true
            me.clearInput()
            me.closeAlert()
          }, (err) => {
            me.alertText = '请检查您的网络' + err
            me.alertType = 'danger'
            me.alertShow = true
            me.closeAlert()
          })
        } else {
          if (!emailReg.test(me.newUser.email)) {
            me.alertText = '请输入正确的邮箱'
            me.alertType = 'danger'
          } else {
            me.alertText = '必填项不能为空'
            me.alertType = 'danger'
          }
          me.alertShow = true
          me.closeAlert()
        }
      })
    }
  },
  computed: {
    ...mapState({
      contactBanners: state => state.contactBanners
    })
  }
}
</script>

<style scoped>
.contact-banner {
  background: #f3f6fa;
  margin-top: 2%;
  margin-bottom: 2%;
  padding-bottom: 2%;
}

.box-grid {
  position: relative;
  padding: 2em;
  background: #fefefe;
  border-radius: 5px;
  border: 1px solid #ddd;
  border-bottom: 2px solid #d1d1d1;
  font-style: italic;
  font-size: 16px;
  font-weight: bold;
}

.box-grid:after {
  border: 10px solid transparent;
  position: absolute;
  bottom: -20px;
  left: 30%;
  content: "";
  border-top: 10px solid #ccc;
}

.form-control:focus {
  border: rgb(111, 232, 176);
}
</style>

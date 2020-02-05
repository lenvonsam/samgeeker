<template lang="pug">
.content.container
  .row
    ol.breadcrumb.border-bottom-line
      li 首页
      li 山姆生活
      li.active 闲聊生活
  .sam-section
    div
      span.h3.mr-4 {{obj.title}}
      .badge {{obj.label}} 
    img.img-fluid.mt-4(v-lazy="obj.imgUrl || obj.thumbUrl")
    .row.mt-4
      .col-md-2.col-sm-3.gallery-box
        .h5 发布日期
        .h5.mt-4 07/01
        .h5.mt-4(v-if="obj.publishTime") {{obj.publishTime.substring(0, 4)}}
        button.btn.btn-primary.mt-4(@click="back") 返回
      .col-md-10.col-sm-9.gallery-info(style="")
        div(v-html="obj.intro")
</template>

<script>
export default {
  data () {
    return {
      obj: {}
    }
  },
  beforeMount () {
    console.log(this.$route.query.id)
    this.getDetail()
  },
  methods: {
    async getDetail () {
      try {
        const { data } = await this.apiPost('/backend/gallery/detail', { id: this.$route.query.id })
        console.log(data)
        if (data.returnCode === 0) this.obj = data.obj
      } catch (e) {
        cnsole.error(e)
      }
    }
  }
}
</script>


<style scoped>
.sam-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.h5 {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3px;
}
.gallery-info {
  padding-top: 20px;
  padding-bottom: 10px;
  background: rgba(111, 232, 176, 0.6);
  box-shadow: 0px 0px 6px #ddd;
}
@media (max-width: 768px) {
  .gallery-info {
    margin-top: 20px;
  }
}
@media (max-width: 600px) {
  .gallery-info {
    margin-top: 0px;
  }
  .gallery-box {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
  }
  .gallery-box .h5 {
    flex: 1;
    font-size: 14px;
    margin-bottom: 0px !important;
  }
  /deep/.gallery-box .mt-4,
  /deep/.gallery-box .h5 {
    margin-top: 0px !important;
  }
  /deep/.gallery-box .btn {
    padding: 4px 8px;
    font-size: 11px;
  }
}
</style>


<template lang="pug">
  .content.container
    .row
      ol.breadcrumb.border-bottom-line
        li 首页
        li.active  项目列表
    .row
      .col-md-2
        ul.list-group
          li.list-group-item(v-for="(pl,i) in projectList",@click="switchProjects(i)", :class="{active: i == projectListIndex}")
            | {{pl.title}}
            span.badge(v-if="pl.count>0") {{pl.count}}
      .col-md-10
        .row
          .col-sm-4(v-for="p in projectArray",style="padding-bottom: 15px;")
            div(style="box-shadow:1px 2px 5px rgb(111, 232, 176);border-radius:2px;")
              .project-img(style="overflow:hidden;border-bottom:1px solid #ddd")
                img.img-responsive(v-lazy="p.projectPicUrl",style="height:200px;")
              div(style="padding:0px 0.5rem;padding-bottom:0.5rem;")
                h4
                  | {{p.title}}
                  tooltip.link-icons.pull-right(placement="left", :title="b.content",trigger="hover",v-for="b in p.details",:key="b.url")
                    a(:href="b.url", v-if="b.type == 'demo'", target="_blank", style="margin-right:5px;")
                      i.fa.fa-tv
                    a(:href="b.url", v-else-if="b.type == 'office'", target="_blank", style="margin-right:5px;")
                      i.fa.fa-font-awesome
                    a(@click="openProjectModal(b.imgs, b.content)", v-else-if="b.type == 'modal'", style="margin-right:5px;")
                      i.fa.fa-th-large
                    a(@click="openProjectModal(b.imgs, b.content)", v-else-if="b.type == 'android'", style="margin-right:5px;")
                      i.fa.fa-android
                    span(v-else)
                .clearfix
                .project-content-ellipsis(v-html="p.intro")
      .col-md-10.col-md-offset-2.text-center
        button.btn(@click="loadMore",style="width:90%;margin-top:1rem",:class="{'btn-success': loadText == '显示更多'}") {{loadText}}
    .project-service
      .row.text-center(style="padding-top:20px;padding-bottom:20px;")
        h4 山姆服务
        h5
          | 值得信赖
          i.fa.fa-thumbs-up(style="font-size:14px;color:#858c9c;margin-left:5px;")
      .row(style="margin-bottom:3%;padding-bottom:3%;")
        .col-sm-4
          .text-center
            i.fa.fa-cubes
            h4 经验丰富
          p
            span.left-mark &nbsp;&nbsp;自2011以来经历过上百个项目开发,种类繁多。从小型的CRM、CMS到大型的ERP,从微信公众号到IOS再到微信小程序,从爬虫到ATM,项目无一列外地开发上线。
            br
            br
            span.left-mark &nbsp;&nbsp;与山姆合作不仅可以少走弯路,而且能得到更专业的行业经验和建议。
        .col-sm-4
          .text-center
            i.fa.fa-rocket
            h4 快速迭代
          p
            span.left-mark &nbsp;&nbsp;2016年阿里峰会提出新科技的理念，山姆认为新的项目务必要迭代快、周期短，只有这样才能让项目在开发中就能去校验期是否符合当下市场的主流，是否有价值。
            br
            br
            span.left-mark &nbsp;&nbsp;与山姆合作不仅每周能看到在线迭代版本更新,而且能每天能得到的工单反馈信息,并且
            span(style="border-bottom:2px solid rgb(111,232, 176)") 24小时微信在线。
        .col-sm-4
          .text-center
            i.fa.fa-connectdevelop
            h4 模块开发
          p
            span.left-mark &nbsp;&nbsp;项目茁壮成长时，往往会面临配套系统升级带来的剧痛。我们自项目初期就开始规划后期的项目升级，以模块式的架构为维护和扩展开个好头。
            br
            br
            span.left-mark &nbsp;&nbsp;与山姆合作无论在哪个平台能享受统一模块解决方案-Vue2.x（简单易用，维护方便）。
    modal.project-gallery(v-model="showProjectModal", :title="modalTitle")
      div(slot="body")
        carousel-3d(v-if="modalImgs.length>1")
          slide(v-for="(sld, i) in modalImgs", :key="sld.id", :index="i", style="border:1px solid rgb(111, 232, 176);border-radius:6px;")
            img.img-responsive(v-lazy="sld",style="height:300px;")
        div(v-else)
          img.img-responsive(v-lazy="sg",v-for="sg in modalImgs")
        .clearfix
      div(slot="footer")
        button.btn.btn-primary(@click="showProjectModal=false",style="border:0px;background:rgb(111,232, 176)") 关闭


</template>

<script>
import { mapState } from 'vuex'
import tooltip from '~/components/Tooltip.vue'
import modal from '~/components/Modal.vue'

export default {
  data () {
    return {
      projectType: ['pc', 'mobile', 'template'],
      projectListIndex: 0,
      projectList: [{
        title: '终端项目',
        count: 0
      }, {
        title: '移动项目',
        count: 0
      }, {
        title: '资源项目',
        count: 0
      }],
      projectArray: [],
      showProjectModal: false,
      modalImgs: [],
      modalTitle: '',
      pageIdx: 1,
      loadText: '加载更多'
    }
  },
  watch: {
  },
  components: {
    tooltip,
    modal
  },
  beforeMount () {
    if (this.$route.query.typeIdx) {
      let type = this.$route.query.typeIdx
      this.projectListIndex = Number(type)
    }
    this.loadData()
  },
  computed: {
    ...mapState({
      pageSize: state => state.pageSize
    }),
    currentPage () {
      return 0 + (this.pageIdx - 1) * this.pageSize
    }
  },
  methods: {
    switchProjects (index) {
      this.jump({ path: '/projects', query: { typeIdx: index } })
      this.modalImgs = []
      this.modalTitle = ''
      this.projectListIndex = index
      this.pageIdx = 1
      this.loadText = '显示更多'
      this.loadData()
    },
    openProjectModal (obj, title) {
      this.modalImgs = obj.split(',')
      this.modalTitle = title
      this.showProjectModal = !this.showProjectModal
    },
    loadMore () {
      ++this.pageIdx
      this.loadData()
    },
    async loadData () {
      const me = this
      me.loadText = '读取中...'
      try {
        let { data } = await this.apiPost('/backend/project', { type: this.projectType[this.projectListIndex], currentPage: this.currentPage, pageSize: this.pageSize })
        if (data.returnCode === 0) {
          if (data.list.length > 0 && me.pageIdx === 1) {
            me.projectArray = data.list
            for (let i in data.count) {
              let item = data.count[i]
              console.log(item)
              if (item[0] === 'pc') {
                me.projectList[0].count = item[1]
              } else if (item[0] === 'mobile') {
                me.projectList[1].count = item[1]
              } else {
                me.projectList[2].count = item[1]
              }
            }
            me.loadText = '显示更多'
          } else if (data.list.length > 0 && me.pageIdx > 1) {
            for (let k in data.list) {
              me.projectArray.push(data.list[k])
            }
            me.loadText = '显示更多'
          } else if (data.list.length === 0 && me.pageIdx > 1) {
            me.loadText = '加载完成'
            --me.pageIdx
          } else {
            me.projectArray = []
            me.loadText = '暂无相关内容'
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}

</script>

<style scoped>
.project-service {
  background: #f3f6fa;
  margin-top: 5%;
  color: #fefefe;
}

.project-service h4 {
  color: #496174;
}

.project-service p,
.project-service h5 {
  color: #858c9c;
}

.list-group-item.active .badge {
  background: #fff;
  color: #0f0f0f;
}

.project-service i.fa {
  color: rgb(111, 232, 176);
  font-size: 50px;
}

span.left-mark {
  border-left: 5px solid rgb(111, 232, 176);
}

.list-group-item:hover {
  cursor: pointer;
}

.list-group-item.active {
  background: rgba(111, 232, 176, 0.8);
  border: 1px solid rgb(111, 232, 176);
}

.list-group-item .badge {
  color: #fff;
  background: rgb(111, 232, 176);
}

.link-icons a {
  color: rgb(111, 232, 176);
}

.btn-success {
  background: rgba(111, 232, 176, 0.8) !important;
  border: 1px solid rgba(111, 232, 176, 0.4);
  color: #fff !important;
}
.project-content-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-box-orient: vertical;
}

.btn {
  background: #ddd;
  color: #858c9c;
}
</style>

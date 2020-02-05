<template lang="pug">
.content.container
  .row
    ol.breadcrumb.border-bottom-line
      li 首页
      li.active  山姆生活
  .sam-gallery
    .card-columns
      .card(v-for="life in lifes", :key="life.id")
        a(:href="'/gallery/detail?id=' + life.id")
          figure.sam-effect
            img.img-fluid(v-lazy="life.thumbUrl")
            figcaption
              .h4 {{life.title}}
              p {{life.label}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentPage: 0,
      total: 0,
      lifes: []
    }
  },
  computed: {
    ...mapState({
      pageSize: state => state.pageSize
    })
  },
  beforeMount () {
    this.loadData()
  },
  methods: {
    async loadData () {
      try {
        const { data } = await this.apiPost('/backend/gallery', {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        console.log('gallery list', data)
        if (data.returnCode === 0) {
          this.total = data.total
          if (this.currentPage === 0 && data.list.length > 0) {
            this.lifes = data.list
          }
        } else {
          this.lifes = []
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.sam-gallery {
  min-height: 600px;
}

.sam-gallery .card-columns .card {
  border: none;
  margin-bottom: 0;
  border-radius: none;
}

@media (max-width: 992px) {
  .sam-gallery .card-columns {
    -webkit-column-count: 2;
    column-count: 2;
  }
}

@media (max-width: 576px) {
  .sam-gallery .card-columns {
    -webkit-column-count: 1;
    column-count: 1;
  }
}

.sam-gallery .card figure {
  position: relative;
  overflow: hidden;
  margin: 10px 1%;
  text-align: center;
}

.sam-gallery .card figure img {
  position: relative;
  display: block;
  max-width: 100%;
  opacity: 1;
}

.sam-gallery .card figure figcaption {
  padding: 2em;
  color: #fff;
  text-transform: uppercase;
  font-size: 1.25em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.sam-gallery .card figure figcaption,
.sam-gallery .card figure figcaption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sam-gallery .card figure figcaption > a {
  z-index: 1000;
  text-indent: 200%;
  white-space: nowrap;
  font-size: 0;
  opacity: 0;
}

.sam-gallery .card figure .h4 {
  word-spacing: -0.15em;
  font-weight: 600;
}

.sam-gallery .card figure .h4,
.sam-gallery .card figure p {
  margin: 0;
}

.sam-gallery .card figure p {
  letter-spacing: 1px;
  font-size: 60%;
}

.sam-gallery figure.sam-effect figcaption {
  padding: 12px;
}

.sam-gallery figure.sam-effect figcaption::before,
.sam-gallery figure.sam-effect figcaption::after {
  position: absolute;
  content: "";
  opacity: 0;
}

.sam-gallery figure.sam-effect figcaption::before {
  top: 50px;
  right: 30px;
  bottom: 50px;
  left: 30px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.sam-gallery figure.sam-effect figcaption::after {
  top: 30px;
  right: 50px;
  bottom: 30px;
  left: 50px;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  -webkit-transform: scale(1, 0);
  transform: scale(1, 0);
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
}

.sam-gallery figure.sam-effect .h4 {
  padding-top: 26%;
  -webkit-transition: -webkit-transform 0.35s;
  transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  transition: transform 0.35s, -webkit-transform 0.35s;
  opacity: 0;
}

.sam-gallery figure.sam-effect p {
  padding: 0.5em 2em;
  text-transform: none;
  opacity: 0;
  -webkit-transform: translate3d(0, -10px, 0);
  transform: translate3d(0, -10px, 0);
}

.sam-gallery figure.sam-effect img,
.sam-gallery figure.sam-effect .h4 {
  -webkit-transform: translate3d(0, -30px, 0);
  transform: translate3d(0, -25px, 0);
}

.sam-gallery figure.sam-effect img,
.sam-gallery figure.sam-effect figcaption::before,
.sam-gallery figure.sam-effect figcaption::after,
.sam-gallery figure.sam-effect p {
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  transition: opacity 0.35s, transform 0.35s, -webkit-transform 0.35s;
}

.sam-gallery figure.sam-effect:hover img {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sam-gallery figure.sam-effect:hover figcaption::before,
.sam-gallery figure.sam-effect:hover figcaption::after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.sam-gallery figure.sam-effect:hover figcaption:before {
  background: rgba(31, 30, 30, 0.5);
}

.sam-gallery figure.sam-effect:hover .h4,
.sam-gallery figure.sam-effect:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  color: #ffffff;
}

.sam-gallery figure.sam-effect:hover figcaption::after,
.sam-gallery figure.sam-effect:hover .h4,
.sam-gallery figure.sam-effect:hover p,
.sam-gallery figure.sam-effect:hover img {
  -webkit-transition-delay: 0.15s;
  transition-delay: 0.15s;
}

@media (max-width: 768px) and (min-width: 578px) {
  .sam-gallery figure.sam-effect:hover .h4 {
    padding-top: 20%;
    font-size: 16px;
  }
}

@media (max-width: 375px) {
  .sam-gallery figure.sam-effect:hover .h4 {
    padding-top: 20%;
    font-size: 16px;
  }
}
.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-columns .card {
  margin-bottom: 0.75rem;
}

@media (min-width: 576px) {
  .card-columns {
    -webkit-column-count: 3;
    column-count: 3;
    -webkit-column-gap: 1.25rem;
    column-gap: 1.25rem;
  }
  .card-columns .card {
    display: inline-block;
    width: 100%;
  }
}
</style>

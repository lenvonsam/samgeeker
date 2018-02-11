const bodyParser = require('body-parser')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '山姆极客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, height=device-height' },
      { name: 'author', content: '山姆极客工作室' },
      { hid: 'description', name: 'description', content: '山姆极客，热爱新科技，山姆博客，山姆极客创人严骏' },
      { name: 'description', content: 'samgeeker, vuejs hunter, full stacker, Black technology' },
      { content: 'IE=edge,chrome=1', 'http-equiv': 'X-UA-Compatible' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'stylesheet', href: 'css/vue2-animate.min.css'},
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'}
    ],
    script: [{
      src: 'https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js'
    }, {
      src: 'https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js'
    }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [{
    src: '~/plugins/vuescrollto',
    ssr: false
  }, {
    src: '~/plugins/vuelazyload',
    ssr: false
  }, {
    src: '~/plugins/vuecarousel3d',
    ssr: false
  }, {
    src: '~/plugins/mixins'
  }],
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios'],
    css: [{
      src: 'bulma',
      lang: 'sass'
    }, {
      src: '~assets/scss/main.scss',
      lang: 'scss'
    }],
    loaders: [{
      test: /\.pug$/,
      loader: 'pug'
    }],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api/backend'
  ]
}

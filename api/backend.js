const express = require('express')

const router = express.Router()

const app = express()

const htpl = require('../utils/httpUtil')
// const syunUrl = 'http://10.31.86.129:8668/api/'
const syunUrl = 'http://10.31.86.129:8099/yun-server/api/'

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

function commGet(url, res, proxyUrl = syunUrl) {
  htpl.httpGet(proxyUrl + url).then(
    ({ data }) => {
      res.json(data)
    },
    err => {
      res.json({ returnCode: -1, errMsg: err.message || '网络异常' })
    }
  )
}

function commPost(url, params, res, proxyUrl = syunUrl) {
  htpl.httpPost(proxyUrl + url, params).then(
    ({ data }) => {
      res.json(data)
    },
    err => {
      res.json({ returnCode: -1, errMsg: err.message || '网络异常' })
    }
  )
}

router.post('/sendEmail', (req, res) => {
  const params = req.body
  params.to = '287754553@qq.com'
  commPost('mail/sendText', params, res)
})

router.get('/gallery/topShow', (req, res) => {
  commGet('gallery/topShow?bid=1', res)
})

router.post('/gallery/detail', (req, res) => {
  commGet('gallery/' + Number(req.body.id), res)
})

router.post('/gallery', (req, res) => {
  const params = req.body
  params.bid = 1
  commPost('gallery', params, res)
})

router.post('/project', (req, res) => {
  const body = req.body
  commGet(
    `project?bid=1&type=${body.type}&currentPage=${body.currentPage}&pageSize=${
      body.pageSize
    }`,
    res
  )
})

module.exports = {
  path: '/backend',
  handler: router
}

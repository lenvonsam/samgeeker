const express = require('express')

const router = express.Router()

const app = express()

const htpl = require('../utils/httpUtil')
const proxyUrl = 'http://wechat.xingyun361.com/quasarserver/'
const syunUrl = 'http://showcase.thinkingsam.cn/syun-backend/api/'

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/sendEmail', (req, res) => {
  const body = req.body
  htpl.httpStreamPost(`${proxyUrl}samsite/sendMail`, body).then(({data}) => {
    res.json(data)
  }, err => {
    console.log(err)
    res.json({returnCode: -1, errMsg: err.message})
  })
})

router.post('/project', (req, res) => {
  const body = req.body
  htpl.httpGet(`${syunUrl}project?bucketId=1&type=${body.type}&currentPage=${body.currentPage}&pageSize=${body.pageSize}`).then(({data}) => {
    res.json(data)
  }, err => {
    console.error(err)
    res.json({returnCode: -1, errMsg: err.message})
  })
})

module.exports = {
  path: '/backend',
  handler: router
}
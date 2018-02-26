const express = require('express')

const router = express.Router()

const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/MP_verify_gsPc64X2e3FynQOi.txt', (req, res) => {
  res.send('gsPc64X2e3FynQOi')
})

module.exports = {
  path: '',
  handler: router
}
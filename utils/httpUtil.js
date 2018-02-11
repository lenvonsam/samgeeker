const axios = require('axios')
const Qs = require('qs')

module.exports = {
  httpGet (url) {
    return axios.get(url)
  },
  httpPost (url, body) {
    return axios({
      method: 'post',
      url: url,
      params: body,
      paramsSerializer: (params) => {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      }
    })
  },
  httpDelete (url, body) {
    return axios({
      method: 'delete',
      url: url,
      params: body,
      paramsSerializer: (params) => {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      }
    })
  },
  httpStreamPost (url, body) {
    return axios.post(url, body)
  }
}
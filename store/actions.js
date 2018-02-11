const actions = {
  validateNull ({commit}, obj) {
    let result = true
    return new Promise((resolve, reject) => {
      let keys = Object.keys(obj)
      for (let k in keys) {
        let val = obj[keys[k]]
        if (val === undefined || val.trim() === '') {
          result = false
          break
        }
      }
      resolve(result)
    })
  },
  configKeyVal ({commit}, {key, val}) {
    commit('changeKeyVal', {key, val})
  }
}

export default actions

const Promise = require('./promise')
Promise.reject(123).finally((data) => {
  console.log('finally', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 2000)
  })
}).then(data => {
  console.log('s',data)
}, err => {
    console.log('e',err)
})
const Promise = require('./promise')
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('123')
  }, 2000)
})
Promise.resolve(p).then(data => {
  console.log('--------------',data)
})
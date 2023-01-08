const fs = require('fs')
// node中也内置了util这样一个库,其中就有一个util.promisify方法
function promisify(fn) { // 把异步api转变为promise的方式
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}
function promisifyAll(target) { // 这个方法不是内置的
  Reflect.ownKeys(target).forEach(key => {
    target[key + 'Async'] = promisify(target[key])
  })
  return target
}
const readFile = promisify(fs.readFile)
readFile('./name.txt', 'utf8').then(data => {
  console.log(data)
})
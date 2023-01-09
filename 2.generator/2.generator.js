let fs = require('fs').promises

function* read() {
  let name = yield fs.readFile('name.txt', 'utf8')
  let age = yield fs.readFile(name, 'utf-8')
  return age
}
// let it = read()
// let { value, done } = it.next()
// // console.log(value)
// value.then(data => {
//   let { value, done } = it.next(data)
//   value.then(data => {
//     let { value, done } = it.next(data)
//     console.log(value)
//   })
// })
function co(it) { // 异步迭代采用函数的方式
  return new Promise((resolve, reject) => {
    function step(val) {
      let {
        value,
        done
      } = it.next(val)
      if (!done) {
        Promise.resolve(value).then(data => {
          step(data)
        }, reject)
      } else {
        resolve(value)
      }
    }
    step()
  })
}
co(read()).then(data => {
  console.log(data)
}).catch(err => {

})
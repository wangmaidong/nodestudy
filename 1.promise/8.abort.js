function wrap(p1) {
  let abort
  let p2 = new Promise((resolve, reject) => {
    abort = reject
  })
  let newP = Promise.race([p1, p2])
  newP.abort = abort
  return newP
}
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功了')
  }, 3000)
})
let p2 = wrap(p1)
p2.then(data => {
  console.log(data)
}, err => {
    console.log(err)
})
setTimeout(() => {
  p2.abort('中断')
}, 2000)
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('no ok')
  },2000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  },3000)
})
Promise.race([p1, p2]).then((data) => {
  console.log(data)
}, (err) => {
    console.log(err)
})
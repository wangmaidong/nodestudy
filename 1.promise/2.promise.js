const Promise = require('./promise')
let p = new Promise((resolve, reject) => {
  reject('err')
})
p.then().then().then().then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})
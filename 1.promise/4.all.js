const Promise = require('./promise')

let fs = require('fs').promises
let getName = fs.readFile('./name.txt', 'utf8')
let getAge = fs.readFile('./age.txt', 'utf8')
Promise.all([1, getName, 2, getAge]).then(data => {
  console.log(data)
})
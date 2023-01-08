// const Promise = require('./promise.js')
// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('成功了')
//   }, 1000)
// })
// p.then((val) => {
//   console.log('success', val)
// }, (reason) => {
//   console.log('fail', reason)
// })
// p.then((val) => {
//   console.log('success', val)
// }, (reason) => {
//   console.log('fail', reason)
// })
const fs = require('fs')
const Promise = require('./promise')

function read(...args) {
  return new Promise((resolve, reject) => {
    // fs.readFile(...args, function (err, data) {
    //   if (err) return reject(err)
    //   resolve(data)
    // })
    resolve('100')
  })
}
let p = read('./name.txt', 'utf8')
let promise2 = p.then((data) => {
  console.log('1success', data)
  return new Promise((resolve, reject) => {
    resolve('3333')
  })
}, err => {
  console.log('1err', err)
  return err
})
// promise2.then(data => {
//   console.log('2success', data)
// }, err => {
//   console.log('2err', err)
// })
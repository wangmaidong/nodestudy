let a = {
  b: 100
}
setTimeout(() => {
  a.b = 200
} , 1000)
module.exports = a

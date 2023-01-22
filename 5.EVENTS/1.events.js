const EventEmitter = require('events')
// const EventEmitter = require('./events')

const util = require('util')
let eat = (a,b,c) => {
  console.log('eat')
}
let cry = () => {
  console.log('cry')
}
function Girl() {

}
util.inherits(Girl, EventEmitter)
let girl = new Girl()
// girl.on('newListener', (type) => {
//   console.log(type)
// })
girl.once('我失恋了', eat)
girl.on('我失恋了', eat)
girl.on('我失恋了', cry)
girl.off('我失恋了', eat)
girl.emit('我失恋了')
girl.emit('我失恋了')
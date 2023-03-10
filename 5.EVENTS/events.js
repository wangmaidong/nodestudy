function EventEmitter() {
  this._events = {}
}
EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = Object.create(null)
  }
  if (eventName !== 'newListener') {
    this.emit('newListener', eventName)
  }
  if (!this._events[eventName]) {
    this._events[eventName] = [callback]
  } else {
    this._events[eventName].push(callback)
  }

}
EventEmitter.prototype.once = function (eventName, callback) {
  let once = (...args) => {
    callback(...args)
    this.off(eventName, once)
  }
  once.l = callback
  this.on(eventName, once)
}
EventEmitter.prototype.off = function (eventName, callback) {
  if(!this._events) return
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => ((fn !== callback) && (fn.l !== callback)))
  }
}
EventEmitter.prototype.emit = function (eventName, ...args) {
  if(!this._events) return
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => fn(...args))
  }
}

module.exports = EventEmitter
const {
  type
} = require("os")
const {
  callbackify
} = require("util")

const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}

function isPromise(val) {
  return typeof val.then === 'function'
}

function resolvePromise(x, promise2, resolve, reject) {
  // 如果 x 和 promise2 是同一个
  if (x == promise2) {
    return reject(new TypeError('出错了'))
  }
  // 看x 是一个普通值 还是一个 promise
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    let called
    try {
      let then = x.then // 看一下是否有then 因为promise实例一定有then
      if (typeof then === 'function') {
        // 如果x是一个promise就要采用他的状态
        then.call(x, function (y) {
          if (called) return
          called = true
          resolvePromise(y, promise2, resolve, reject)
        }, function (r) {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x) // 只是一个普通对象
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e) // 取then时可能还会报错
    }

  } else {
    resolve(x) // x是一个原始数据类型
  }
}
class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (val) => {
      if (val instanceof Promise) {
        return val.then(resolve, reject)
      }
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.FULFILLED
        this.value = val
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status == STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => {
      throw err
    }
    let promise2 = new Promise((resolve, reject) => {
      if (this.status == STATUS.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status == STATUS.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === STATUS.PENDING) {
        // 装饰模式，切片编程
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  finally(callback) {
    return this.then((data) => {
      return Promise.resolve(callback()).then(() => data)
    }, err => {
        return Promise.resolve(callback()).then(() => {
        throw err
      })
    })
  }
  static resolve(val) {
    return new Promise((resolve, reject) => {
      resolve(val)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promise) {
    return new Promise((resolve, reject) => {
      let result = []
      let times = 0

      function processData(index, val) {
        result[index] = val
        if (++times === promise.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promise.length; i++) {
        let p = promise[i]
        if (isPromise(p)) {
          p.then(data => {
            processData(i, data)
          }, reject)
        } else {
          processData(i, p)
        }
      }
    })
  }
  static race(promise) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promise.length; i++) {
        let currentVal = promise[i]
        if (isPromise(currentVal)) {
          currentVal.then(resolve, reject)
        } else {
          resolve(currentVal)
        }
      }
    })
  }
  catch (err) { // 默认没有成功 只有失败
    return this.then(null, err)
  }
}
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
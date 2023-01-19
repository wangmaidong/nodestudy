// 如果同时存在a.js 和a.json 优先级
const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(filename) {
  this.id = filename // 文件名
  this.exports = {} // 代表导出结果
  this.path = path.dirname(filename) // 导入文件所在的文件夹
}
Module.prototype.load = function () {
  // 加载时需要获取当前文件的后缀名 ，根据后缀名采用不同的策略进行加载
  let extension = path.extname(this.id)
  Module._extensions[extension](this) // 根据这个规则进行模块的加载
}
Module._extensions = {}
Module._cache = {}
Module.wrapper = (content) => {
  return `(function(exports,require,module,__filename,__dirname){${content}})`
}
Module._extensions['.js'] = function (module) {
  let content = fs.readFileSync(module.id, 'utf8')
  // 根据内容包裹一个函数
  let str = Module.wrapper(content) // 目前只是字符串
  let fn = vm.runInThisContext(str) // 
  let exports = module.exports
  fn.call(exports, exports, myReq, module, module.id, module.path)
  //这句代码执行后 会调用引入文件的 module.exports = 100
  // 模块中的this不是module 是module.exports
}
Module._extensions['.json'] = function (module) {
  let content = fs.readFileSync(module.id, 'utf8')
  module.exports = JSON.parse(content)
}
Module._resolveFilename = function (filename) {
  let filePath = path.resolve(__dirname, filename)
  let isExists = fs.existsSync(filePath)
  if (isExists) return filePath
  // 尝试添加 .js 和  .json后缀
  let keys = Reflect.ownKeys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    let newFile = filePath + keys[i] // 尝试增加后缀
    if (fs.existsSync(newFile)) return newFile
  }
  throw new Error('module not found')
}

function myReq(filename) {
  // 1.解析当前的文件名
  filename = Module._resolveFilename(filename)
  if (Module._cache[filename]) {
    return Module._cache[filename].exports
  }
  // 2.创建一个模块
  let module = new Module(filename)
  Module._cache[filename] = module
  // 3.加载模块
  module.load()
  return module.exports
}
let r = myReq('./a.js') // 默认只识别module.exports导出的值
console.log('r--->', r)
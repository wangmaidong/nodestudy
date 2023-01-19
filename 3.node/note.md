阻塞和非阻塞针对的是调用方 异步同步针对的是被调用方
node不适合cpu密集型比如文件压缩、加密计算类型的操作 适合i/o密集型文件的读写，node可以开子进程呢个，多个进程可以充分利用cpu内核
node中的全局对象 浏览器中的this指代的是window 服务端中的this指代的都是global
默认我们访问是在文件中访问额this 内部被更改了 所以不是global是module.exports
全局变量是指在文件中不用声明可以直接访问的变量 但是global上的属性叫全局属性
全局属性 clearInterval clearTimeout setInterval setTimeout queueMicrotask setImmediate  process Buffer

--------process进程--------
常用属性 platform chdir cwd env argv nextTick
platform 判断node运行的系统 根据不同平台操作系统文件
cwd 获取当前执行node命令的目录， 可以找到当前目录下的某个文件
chdir 改变当前执行node命令的目录 但是改变的目录参数要在当前根目录下真实存在
env 当前系统环境变量 如果是windows 可以使用 set xxx = xxx 如果是mac可以使用 export xxx = xxx
如果不区分系统环境可以安装第三方模块 用于设置环境变量
argv获取运行代码时传入的参数 --port --confi 返回的是一个数组，数组的索引第0个是node执行程序的位置 第二位是执行的文件的路径 后面才是命令的参数  也可以使用第三方插件 commander解析用户传递的参数

--------node事件环---------
node中也有一个事件环，包含了i/o操作， node在版本10之后执行顺序就和浏览器一致了
timers 定时器 
pengding callbacks 上一轮没有执行完的回调，node中有个最大执行个数，超过的部分放到下一轮
idle, prepare 内部系统使用的队列
poll 轮询，i/o相关操作的回调，会在特定的时候进行阻塞
check setImmediate的回调
close callbacks
我们需要关心的 timer poll check
nextTick 和promise.then都是微任务 但是nextTick的级别更高一些，nextTick会在当前执行栈中的代码执行完毕后 立即调用

---------代码调试----------
1.可以直接node --inspect-brk 文件名 实现调试功能 借助浏览器来调试
然后在浏览器输入chrome://inspect打开即可
使用文档链接：https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/
2.vscode调试源码  nodej调试源码 必须创建一个json文件 默认需要取消internal_files否则无法调试源代码
跳到下一个断点  单步跳过（不进入方法中） 进入方法中 离开方法

---------require-------------
1.Module.prototype.require require方法是定义在模块原型上的
2.Module._load 加载模块
3.Modeule._resolveFilename 解析出绝对路径 并且添加后缀
4.new Module 创建一个模块 该实例具有id 文件名 exports是一个对象 存放的是模块导出的结果 
5.module.load 加载模块
6.Module._extensions 存放着不同后缀文件的处理

最终返回的是module.exports
模块导出不能使用 exports = xxxx , 可以使用exports.a  module.exports.a this.a
---------require查找规则------------
默认会优先查找 当前文件夹下的js文件 --> json文件 --> 同名文件夹下的 查找package.json 中 main字段 的文件，如果没有就会查找index.js
如果文件不是绝对路径或者相对路径（不是核心模块）会去当前文件夹下的node_modules 下查找
如果当前node_modules找不到会继续向上查找 ，直到根目录位置 ，找不到就会报错

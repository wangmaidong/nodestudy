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


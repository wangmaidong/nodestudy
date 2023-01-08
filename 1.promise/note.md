promise的链式调用问题
1.如果then方法中（成功或失败）返回的不是一个promise,会将这个值传递给外层下一次then的成功结果
2.如果执行then方法中的方法出错了，抛出异常， 会走到下一个then的失败
3.如果返回的是一个promise，会使用这个promise的结果作为下一个then的成功或者失败

调用下一个then方法的失败的情况 1.出错 2.返回的promise会出错
catch就是then方法的别名，没有成功的回调只有失败的回调 then(null, (reason) => {})
then方法可以链式调用的原因就是每次调用then都会返回一个新的promise


Promise.resolve 可以等待一个promise执行完毕 
Prmosie.reject 不会等待
finally 传入的回调函数 无论如何都会执行  也具有等待效果
Prmosie.all 一个失败就全都失败了
Promise.race 赛跑 采用跑的快的作为结果
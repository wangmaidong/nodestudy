1.node是基于事件的，内部自己实现了一个发布订阅模式

2.events是node的一个内置核心模块

on方法订阅事件

off方法取消订阅

emit方法发布事件

on('newListener', cb)  监听订阅了哪些事件

once方法订阅的事件只触发一次
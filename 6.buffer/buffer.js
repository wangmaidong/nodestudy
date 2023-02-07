// 1.buffer的声明方式 固定大小生命出来后不能随意改变
var buffer = Buffer.alloc(6) // 字节数 默认后端生命的大小的数量 都是字节数
console.log(buffer)
// 想改buffer可以通过索引更改
buffer[5] = 100
console.log(buffer)
// 想更改buffer的大小 是无法更改的 可以再声明一个空间将结果拷贝过去
var buffer = Buffer.alloc(12)
var buffer1 = Buffer.from('珠峰')
var buffer2 = Buffer.from('培训')
Buffer.prototype.copy = function (targetBuffer, targetStart = 0, sourceStart = 0, sourceEnd = this.length) {
  for (let i = sourceStart; i < sourceEnd; i++) {
    targetBuffer[targetStart++] = this[i]
  }
}
buffer1.copy(buffer, 0, 0, 6) // 第一个0 表示从buffer的第0位开始拷贝 拷贝buffer1的0 到 6
buffer2.copy(buffer, 6, 0, 6)
Buffer.concat = function (bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
  let buf = Buffer.alloc(length)
  let offset = 0
  bufferList.forEach(buffItem => {
    buffItem.copy(buf, offset)
    offset += buffItem.length
  })
  return buf
}
var newBuffer = Buffer.concat([buffer1, buffer2])
console.log(newBuffer)
// length buffer的字节数
// toString 转成字符
// concat 拼接两个buffer
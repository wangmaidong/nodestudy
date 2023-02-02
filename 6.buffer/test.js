let r = Buffer.from('珠') // Buffer采用的是二进制但是输出结果使用16进制表示，因为二进制太长了
console.log(r) // e7 8f a0

console.log(0xe7.toString(2)) // 11100111
console.log(0x8f.toString(2)) // 10001111
console.log(0xa0.toString(2)) // 10100000

//base64需要拆分成 4*6的格式 所以转换之后会比原有的数据要大一些
//111001 111000 111110 100000 只有六位所以最大只能表示到63  也就是只能表示64个数

console.log(parseInt('111001', 2)) // 57
console.log(parseInt('111000', 2)) // 56
console.log(parseInt('111110', 2)) // 62
console.log(parseInt('100000', 2)) // 32

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLowerCase()
str += '0123456789+/'

console.log(str[57] + str[56] + str[62] + str[32]) // 54+g
// 用54+g去base64解码就可以拿到对应的字符


// 或者使用如下
console.log(Buffer.from('珠').toString('base64')) // 54+g
前端的二进制
ASCII  一个字节
gb2312 一个汉字由两个字节组成 用了一部分来设计汉字
gbk -> gb18030
unicode => utf8 一个汉字就是三个字节 js语言使用的是utf16
buffer node中的二进制 global上定义的类 但展现方式是16进制

parseInt('1111111', 2) 可以进行进制的转化 结果是数字
255.0.toString(16) 可以将任意进制转化成任意进制

let r = 
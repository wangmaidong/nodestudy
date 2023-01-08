
function gen$(context) {
  while (true) {
    console.log('hhhhhh')
    switch (context.prev = context.next) {
      case 0:
        context.next = 1
        console.log(0)
        return 1
      case 1:
        context.next = 2
        console.log(1)
        return 2
      case 2:
        context.next = 3
        console.log(2)
        return 3
      case 3:
        context.stop()
        console.log(3)
        return 100
    }
  }
}
let gen = function () {
  const context = {
    prev: 0, // 当前要运行的
    next: 0, // 下次运行的
    done: false, // 是否完成
    stop() {
      this.done = true
    }
  }
  return {
    next() {
      return {
        value: gen$(context),
        done: context.done
      }
    }
  }
}
let it = gen()
console.log(it.next())
微任务
 console.log('then1')
    Promise.resolve().then(() => {
      console.log('then1-1')
      // return Promise.resolve()
    }).then(() => {
      console.log('then1-2')
})
微任务
console.log('then1-1')

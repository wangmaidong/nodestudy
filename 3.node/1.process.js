console.log(process.platform)
console.log(process.cwd())
console.log(process.env.A)
console.log(process.argv.slice(2))
let args = process.argv.slice(2).reduce((previousValue, currentValue, currentIndex, arr) => {
  if (currentValue.includes('--')) {
    previousValue[currentValue.slice(2)] = arr[++currentIndex]
  }
  return previousValue
}, {})
console.log(args)
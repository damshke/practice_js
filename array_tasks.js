// four

const newArr = (...args) => (args.map(element => element * args.length))

console.log(newArr(3, 4, 5, 6))
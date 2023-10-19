// four


function interestingMultiplication(...args) {
    let newArr = []
    args.forEach(element => newArr.push(element * args.length))
    return newArr
}

console.log(interestingMultiplication(3, 5, 8, 10))
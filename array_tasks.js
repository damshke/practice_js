const arr = ['banana', true, 1, 'car', {}, { a: 1 }, 5, true, true, false, 455, {}]

// first
// вариант с forEach

function multiplOnyTwo(arr) {
    let newArr = []
    arr.forEach(element => {
        Number.isFinite(element) ? newArr.push(element * 2) : newArr.push(element)
    })
    return newArr
}

// вариант с map

const multiplyArray = arr.map(item => Number.isFinite(item) ? item * 2 : item)

console.log(multiplyArray)
console.log(multiplyOnTwo(arr))
// two
const arr = ['banana', true, 1, 'car', {}, { a: 1 }, 5, true, true, false, 455, {}]
function howManyDataTypes(arr) {
    let obj = {}
    arr.forEach(element => {
        obj[typeof (element)] == undefined ? obj[typeof (element)] = 1 : obj[typeof (element)] = obj[typeof (element)] + 1;
    })
    return obj
}

console.log(howManyDataTypes(arr))

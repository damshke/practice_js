// two
const arr = ['banana', true, 1, 'car', {}, { a: 1 }, 5, true, true, false, 455, {}]

const howManyDataTypes = (arr) => arr.reduce((obj, item) => {
    obj[typeof (item)] = (obj[typeof (item)] || 0) + 1;
    return obj;
}, {})

console.log(howManyDataTypes(arr))

// first

const multiplyArray = (arr) => arr.map((item) => (Number.isFinite(item) ? item * 2 : item));

console.log(multiplyArray(arr))

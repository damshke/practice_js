const arr = ['banana', true, 1, 'car', {}, { a: 1 }, 5, true, true, false, 455, {}]

// first

const multiplyArray = (arr) => arr.map((item) => (Number.isFinite(item) ? item * 2 : item));

console.log(multiplyArray(arr))
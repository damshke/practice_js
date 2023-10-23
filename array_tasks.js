const wordsArr = ['fruit', 'keyboard', 'word', 'word', 'keyboard', 'word', 'fruit', 'banana']

// fifth

const sorting = (arr) => {
    const dict = arr.reduce((acc, item) => { acc[item] = acc[item] ? acc[item] + 1 : 1; return acc }, {});
    return Object.keys(dict).sort((a, b) => dict[b] !== dict[a] ? dict[b] - dict[a] : a.localeCompare(b))
}

console.log(sorting(wordsArr))

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


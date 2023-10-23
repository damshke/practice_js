const wordsArr = ['fruit', 'keyboard', 'word', 'word', 'keyboard', 'word', 'fruit', 'banana']

// first

const multiplyArray = (arr) => arr.map((item) => (Number.isFinite(item) ? item * 2 : item));

console.log(multiplyArray(arr))

// two

const arr = ['banana', true, 1, 'car', {}, { a: 1 }, 5, true, true, false, 455, {}]

const howManyDataTypes = (arr) => arr.reduce((obj, item) => {
    obj[typeof (item)] = (obj[typeof (item)] || 0) + 1;
    return obj;
}, {})

console.log(howManyDataTypes(arr))

// three

function specialSorting(arr) {
    const dataTypes = ['boolean', 'number', 'string', 'object']
    return dataTypes.reduce((newArr, item) => {
        return newArr.concat(arr.filter(elem => { return typeof (elem) === item }))
    }, [])
}

const newArrSort = specialSorting(arr)

console.log(newArrSort)

// four

const newArr = (...args) => (args.map(element => element * args.length))

console.log(newArr(3, 4, 5, 6))

// fifth

const sorting = (arr) => {
    const dict = arr.reduce((acc, item) => { acc[item] = acc[item] ? acc[item] + 1 : 1; return acc }, {});
    return Object.keys(dict).sort((a, b) => dict[b] !== dict[a] ? dict[b] - dict[a] : a.localeCompare(b))
}

console.log(sorting(wordsArr))


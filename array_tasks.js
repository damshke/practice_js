const wordsArr = ['fruit', 'keyboard', 'word', 'word', 'keyboard', 'word', 'fruit', 'banana']

function sortingWordsArr(arr) {
    let newMap = new Map()
    arr.map(item => newMap.set(item, newMap.has(item) ? newMap.get(item) + 1 : 1))
    const sortedArr = new Map([...newMap.entries()].sort((a, b) => b[1] - a[1]))
    return [...sortedArr.keys()]
}

// console.log(sortingWordsArr(wordsArr))

const sorting = (arr) => {
    const dict = arr.reduce((acc, item) => { acc[item] = acc[item] ? acc[item] + 1 : acc[item] = 1; return acc }, {});
    return Object.keys(dict).sort((a, b) => dict[b] !== dict[a] ? dict[b] - dict[a] : a.localeCompare(b))
}

console.log(sorting(wordsArr))
const arr = ['banana', true, 1, 'car', {}, { a: 1 }, 5, true, true, false, 455, {}]

// three

function specialSorting(arr) {
    const dataTypes = ['boolean', 'number', 'string', 'object']
    let sotredArr = dataTypes.reduce((newArr, item) => {
        return newArr.concat(arr.filter(elem => { return typeof (elem) === item }))
    }, [])
    return sotredArr
}

const newArr = specialSorting(arr)

console.log(newArr)
const arr = ['banana', true, 1, 'car', {}, { a: 1 }, 5, true, true, false, 455, {}]

// three

function specialSorting(arr) {
    const dataTypes = ['boolean', 'number', 'string', 'object']
    let newArr = []
    dataTypes.forEach(element => {
        const tmpArr = arr.filter(function (elem) {
            return typeof (elem) === element
        })
        newArr.push(...tmpArr)
    })
    return newArr
}

const newArr = specialSorting(arr)

console.log(newArr)
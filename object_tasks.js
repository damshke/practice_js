
// two

const convertObject = (obj) => ({ ...obj, d: obj.a + obj.c });

const obj = { a: 1, b: 2, c: 3 }

console.log(convertObject(obj))

// first

function keyCount(obj) {
    return Object.keys(obj).length
}

const obj = { a: 1, b: 2, c: 3, d: 4 }

console.log(keyCount(obj))


// two

function convertObject(obj) {
    obj.d = obj.a + obj.c
    return obj
}

const obj = { a: 1, b: 2, c: 3 }

console.log(convertObject(obj))
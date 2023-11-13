// написать пример типизации метода map у массивов

function newMap(fn: (a: unknown) => unknown, arr: unknown[]) {
    let new_arr: Array<unknown> = []
    arr.forEach((element) => new_arr.push(fn(element)));
    return new_arr;

}

const array = [1, 2, 3];
const array_string = ['a', 'b', 'c'];

const new_array = newMap((x) => x + 'x', array);
const new_array_string = newMap((x) => x + 'a', array_string);

console.log(new_array);
console.log(new_array_string);
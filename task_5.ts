// написать пример типизации метода map у массивов

type AllTypes =
    | boolean
    | number
    | string
    | null
    | undefined
    | object;

function newMap(fn: (a: AllTypes) => AllTypes, arr: AllTypes[]) {
    let new_arr: Array<AllTypes> = []
    arr.forEach((element) => new_arr.push(fn(element)));
    return new_arr;

}

const array = [1, 2, 3];
const array_string = ['a', 'b', 'c'];

const new_array = newMap((x) => x + 'x', array);
const new_array_string = newMap((x) => x + 'a', array_string);

console.log(new_array);
console.log(new_array_string);
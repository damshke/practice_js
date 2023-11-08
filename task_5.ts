// написать пример типизации метода map у массивов

function newMap<T>(fn: (a: T) => T, arr: T[]) {
    let new_arr: Array<T> = []
    arr.forEach((element) => new_arr.push(fn(element)));
    return new_arr;

}

const array = [1, 2, 3];
const array_string = ['a', 'b', 'c'];

const new_array = newMap<number>((x) => x * 2, array);
const new_array_string = newMap<string>((x) => x + 'a', array_string);

console.log(new_array);
console.log(new_array_string);

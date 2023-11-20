// написать пример типизации метода map у массивов

function newMap<Input, Output>(
  fn: (a: Input, index: number, array: Input[]) => Output,
  arr: Input[]
) {
  let new_arr: Array<Output> = [];
  arr.forEach((element, index, array) =>
    new_arr.push(fn(element, index, array))
  );
  return new_arr;
}

const array = [1, 2, 3];
const array_string = ["a", "b", "c"];

const new_array = newMap((x, index) => x + index, array);
const new_array_string = newMap((x) => x + "a", array_string);
const new_array_with_prev = newMap(
  (x, index, array) => (index > 0 ? x - array[index - 1] : x),
  array
);

console.log(new_array);
console.log(new_array_string);
console.log(new_array_with_prev);

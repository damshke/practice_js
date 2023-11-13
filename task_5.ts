// написать пример типизации метода map у массивов

function newMap<Input, Output>(
  fn: (a: Input, index: number, array: Input[]) => Output,
  arr: Input[]
) {
  let new_arr: Array<ReturnType<typeof fn>> = [];
  arr.forEach((element, index, array) =>
    new_arr.push(fn(element, index, array))
  );
  return new_arr;
}

const array = [1, 2, 3];
const array_string = ["a", "b", "c"];

const new_array = newMap((x, index) => x + index, array);
const new_array_string = newMap((x) => x + "a", array_string);
const new_array_with_prev = newMap((x, index, array) => {
  if (index > 0) {
    return x - array[index - 1];
  } else {
    return x;
  }
}, array);

console.log(new_array);
console.log(new_array_string);
console.log(new_array_with_prev);

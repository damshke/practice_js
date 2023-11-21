type Output<T> = { [key: string]: T[] };

function groupBy<T>(arr: T[], key: keyof T): Output<T> {
  return arr.reduce((acc: Output<T>, cur) => {
    const groupKey = cur[key];
    if (!acc[groupKey as string]) {
      acc[groupKey as string] = [];
    }
    acc[groupKey as string].push(cur);
    return acc;
  }, {});
}

const objects: { id: number; name: string; age: number }[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 25 },
  { id: 4, name: "David", age: 30 },
];

const groupedByAge: Output<(typeof objects)[0]> = groupBy(objects, "age");
console.log(groupedByAge);

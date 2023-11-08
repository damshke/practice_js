type People = {
    id: number;
    name: string;
    age: number;
}

type Output = {
    [key: string]: People[]
}

function groupBy(arr: People[], key: string): Object {
    return arr.reduce((acc: Output, cur) => {
        const groupKey = cur[key as keyof typeof cur];        
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(cur);
        return acc;
    }, {});
}

const objects: People[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 25 },
    { id: 4, name: 'David', age: 30 },
];

const groupedByAge: Object = groupBy(objects, 'age');
console.log(groupedByAge);


enum Type {
    Mammal,
    Bird, 
    Reptile,
    Insect,
    Fish,
}

type Animal = {
    name: string,
    age: number,
    type: string,
}

interface Cat extends Animal {
    isMeowing: boolean,
}

interface Dog extends Animal {
    isBarking: boolean,
}

interface Bird extends Animal {
    isSinging: boolean, 
}

const Dog: Dog = {
    name: 'dog',
    age: 3,
    type: Type[0],
    isBarking: true,
}

console.log(Dog) // { name: 'dog', age: 3, type: 'Mammal', isBarking: true }
enum Type {
    Mammal = "Mammal",
    Bird = "Bird", 
    Reptile = "Reptile",
    Insect = "Insect",
    Fish = "Fish",
}

type Animal = {
    name: string,
    age: number,
    type: Type,
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
    type: Type.Mammal,
    isBarking: true,
}

console.log(Dog) // { name: 'dog', age: 3, type: 'Mammal', isBarking: true }
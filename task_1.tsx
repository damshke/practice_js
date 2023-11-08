enum Sex {
    Male,
    Female,
}

type Person = {
    name: string,
    age: number,
    sex: Sex,
}

interface User {
    person: Person,
    email: string,
    password: string,
}
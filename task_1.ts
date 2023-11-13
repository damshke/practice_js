enum Sex {
    MALE = 'male',
    FEMALE = 'female',
}

type Person = {
    name: string,
    age: number,
    sex: Sex,
}

interface User {
    name: string,
    age: number,
    sex: Sex,
    email: string,
    password: string,
}
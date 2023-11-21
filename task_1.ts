enum Sex {
  MALE = "male",
  FEMALE = "female",
}

type Person = {
  name: string;
  age: number;
  sex: Sex;
};

interface User extends Person {
  email: string;
  password: string;
}

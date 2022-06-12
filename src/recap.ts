const myName = 'Max';
const myAge = 30;

const suma = (a: number, b: number) => a + b;

suma(12, 13);

class Person {
  constructor(private name: string, private age: number) {
    this.name = name;
    this.age = age;
  }

  getSummary() {
    return `${this.name} is ${this.age} years old.`;
  }
}

const person = new Person(myName, myAge);
person.getSummary();

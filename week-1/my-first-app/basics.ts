// Primities: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

import { ITS_JUST_ANGULAR } from "@angular/core/src/r3_symbols";

// Primitives

let age: number;

age = 12;

let userName: string;

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// More complex types

// arrays
let hobbies: string[]; //creates an array of strings. Can do number[] and boolean[]

hobbies = ['Sports', 'Cooking'];

// type aliases
type Person = {
    name: string;
    age: number;
};

// objects
// let person: {
//     name: string;   
//     age: number;
// };
let person: Person;

person = {
    name: 'Max',
    age: 32
};

// array of objects
// let person: {
//     name: string;   
//     age: number;
// }[];
let persons: Person[];

//  Type inference

// if you immediately initialize a variable, typescript will use the value as the infered type for the variable
// Union types let you specify more than one type
let course: string | number = 'React - The Complete Guide';

course = 12341;

// Functions & types

// infers the type that will be returned
function add(a: number, b: number) {
    return a + b;
}

// has a special return type of :void since nothing is returned
function printOutput(value: any) {
    console.log(value);
}

// Generics

// Can't use any as it removes all typescript features. Use a generic type instead. Generally uses T.
function insertAtBeginning<T>(array: T[], value: T) {
    //... javascript feature copying an array
    // creates a new array instead of changing previous array and adds a value at the beginning
    const newArray = [value, ...array];
    return new Array;
}

const demoArray = [1, 2, 3,];

const updatedArray = insertAtBeginning(demoArray, -1); // -1, 1, 2, 3
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

// Classes & interfaces

class Student {
    // The standard way to set it up:
    // firstName: string;
    // lastName: string;
    // age: number;
    // private courses: string[];

    // constructor(first: string, last: string, age: number, courses: string[]) {
    //     this.firstName = first;
    //     this.lastName = last;
    //     this.age = age;
    //     this.courses = courses;
    // }

    // Set up can be shortened to:
    constructor(
        public firstName: string, 
        public lastName: string, 
        public age: number, 
        private courses: string[]
        ) {}

    enroll(courseName: string) {
        this.courses.push(courseName);
    }

    // adding slice() makes a copy
    listCourses() {
        return this.courses.slice();
    }
}

const student = new Student('Max', 'Schwarz', 32, ['Angular']);
student.enroll('React');
student.listCourses();
// student.courses => Angular, React

// Interfaces are an alternative to type keyword. Difference is interfaces can be implemented by classes. 
// Forces classes to have structure defined by interface
interface Human {
    firstName: string;
    age: number;

    // greet method that takes no parameters and returns nothing
    greet: () => void;
}

let max: Human;

max = {
    firstName: 'Max',
    age: 32,
    greet() {
        console.log('Hello');
    },
};


// Instructor is forced to take on structure of Human
class Instructor implements Human {
    firstName: string;
    age: number;
    greet() {
        console.log('Hello');
    }
}
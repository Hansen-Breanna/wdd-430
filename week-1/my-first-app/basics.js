"use strict";
// Primities: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
// Primitives
var age;
age = 12;
var userName;
userName = 'Max';
var isInstructor;
isInstructor = true;
// More complex types
// arrays
var hobbies; //creates an array of strings. Can do number[] and boolean[]
hobbies = ['Sports', 'Cooking'];
// objects
// let person: {
//     name: string;   
//     age: number;
// };
var person;
person = {
    name: 'Max',
    age: 32
};
// array of objects
// let people: {
//     name: string;   
//     age: number;
// }[];
var people;
//  Type inference
// if you immediately initialize a variable, typescript will use the value as the infered type for the variable
// Union types let you specify more than one type
var course = 'React - The Complete Guide';
course = 12341;
// Functions & types
// infers the type that will be returned
function add(a, b) {
    return a + b;
}
// has a special return type of :void since nothing is returned
function printOutput(value) {
    console.log(value);
}
// Generics
// Can't use any as it removes all typescript features. Use a generic type instead. Generally uses T.
function insertAtBeginning(array, value) {
    //... javascript feature copying an array
    // creates a new array instead of changing previous array and adds a value at the beginning
    var newArray = __spreadArray([value], array);
    return new Array;
}
var demoArray = [1, 2, 3,];
var updatedArray = insertAtBeginning(demoArray, -1); // -1, 1, 2, 3
var stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
// Classes & interfaces
var Student = /** @class */ (function () {
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
    function Student(firstName, lastName, age, courses) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.courses = courses;
    }
    Student.prototype.enroll = function (courseName) {
        this.courses.push(courseName);
    };
    // adding slice() makes a copy
    Student.prototype.listCourses = function () {
        return this.courses.slice();
    };
    return Student;
}());
var student = new Student('Max', 'Schwarz', 32, ['Angular']);
student.enroll('React');
student.listCourses();
var max;
max = {
    firstName: 'Max',
    age: 32,
    greet: function () {
        console.log('Hello');
    }
};
// Instructor is forced to take on structure of Human
var Instructor = /** @class */ (function () {
    function Instructor() {
    }
    Instructor.prototype.greet = function () {
        console.log('Hello');
    };
    return Instructor;
}());

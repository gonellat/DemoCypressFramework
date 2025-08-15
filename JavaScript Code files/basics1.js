console.log('Hello World');

// Javascript variables are loosely typed // don't need to define whether int etc..
// We can declare variables using let, var, const
// let and const are available in ES6
// var is available in ES5 and before
// Const can't be reassigned
// var can be redeclared and reassigned
// let can be reassigned but not redeclared in the same scope

let a = 4;
console.log(a);
// typeof is used to check the type of variable
console.log(typeof a);

let b = 234.6;
console.log(typeof b);

var c = 'Rahul Shetty';
console.log(typeof c);

let required = true;
console.log(typeof required);
//null and undefined
// let c = a+b ( it did not work //we cannot redeclare variable with let keyword but possible with var)
c = a + b; // reassigning is allowed with let
//var c=a+b )this is also allowed)
console.log(c);

console.log(!required);

//these are comments
/*
dsds
dss
dss
*/

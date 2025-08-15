//block of code 
//var - global level/functional
//let global level/block level {}
//const -
const greet = "Evening"
//greet = "night"

if( 1 ==1)
{
    let greet = "Afternoon"
}

function add(a,b)
{
    let greet = "Morning"
    return a+b
}

let sum =add(2,3)
console.log(sum)
console.log(greet)

// Anyonymus function
// Do not have name
// This is a different way of defining a function
// function keyword is not used, instead we use let or const
let sumOfIntegers = function(c,d)
{
    return c+d
}

// Can simplify even further by using arrow function
// Arrow function is a shorter syntax for writing functions
// Bit in brackets is the parameter list. After the arrow is the function body
// sumOfNumbers becomes the function name
let sumOfNumbers= (c,d)=> c+d

console.log(sumOfNumbers(2,3))





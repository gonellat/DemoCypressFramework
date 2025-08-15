var marks = Array(6);
var marks = new Array(20, 40, 35, 12, 37, 100);
// or you can use this
var marks = [20, 40, 35, 12, 37, 100];
subMarks = marks.slice(2, 5);
console.log(subMarks);
//subMarks will be [35,12,37]
console.log(marks[2]); //35
marks[3] = 14;
console.log(marks); //[20,40,35,14,37,100]
console.log(marks.length); //6
// adding elements to the array
marks.push(65);
console.log(marks); //[20,40,35,14,37,100,65]
// removing elements from the array
marks.pop(); //[20,40,35,14,37,100]
// insert at the beginning
marks.unshift(12);
console.log(marks);
console.log(marks.indexOf(100)); // index 6
//120 in the array
console.log(marks.includes(120)); // false
//===========
var sum = 0;
for (let i = 0; i < marks.length; i++) {
  //console.log(marks[i])
  sum = sum + marks[i]; //32+40 etc.
}
console.log(sum);
//============
// This is another way to do the same thing with reduce
// Sum is an accumulation of values, 0 is the initial value
let total = marks.reduce((sum, mark) => sum + mark, 0);
console.log(total);

var scores = [12, 13, 14, 16];
//create new array with even numbers of scores and multiply each value
// with 3 and sum themarray [12,14,16]
var evenScores = [];
for (let i = 0; i < scores.length; i++) {
  if (scores[i] % 2 == 0) {
    evenScores.push(scores[i]);
  }
}
console.log(evenScores);
// Another way of doing it is using filter
// filter returns a new array with the elements that pass the test implemented by the provided function.
// score is the current element in the array
// score %2 == 0 is the test condition
let newFilterEvenScores = scores.filter((score) => score % 2 == 0);
console.log(newFilterEvenScores); //[ 12, 14, 16 ]=>[36,42,48]

// ==============

// map is used to create a new array with the results of calling a provided function on every element in the calling array.
// Here we are multiplying each element by 3
let mappedArray = newFilterEvenScores.map((score) => score * 3);
console.log(mappedArray);
let totalVal = mappedArray.reduce((sum, val) => sum + val, 0);
console.log(totalVal);
var scores1 = [12, 13, 14, 16];

// All in one go...
let sumValue = scores1
  .filter((score) => score % 2 == 0)
  .map((score) => score * 3)
  .reduce((sum, val) => sum + val, 0);
console.log(sumValue);
let fruits = ['banana', 'mango', 'pomegrante', 'apple'];

console.log(fruits.sort());
console.log(fruits.reverse());

var scores1 = [12, 003, 19, 16, 14]; //9 is the gap between 003 and 12
// console.log(scores1.sort())
// scores1.sort(function(a,b){
//     return a-b
// })

console.log(scores1.sort((a, b) => b - a));

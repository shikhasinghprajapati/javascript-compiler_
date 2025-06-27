// This is the sample JavaScript code including loops and conditional statements
// that we will process through all compiler phases.


//Conditional Statements and declaration
let x = 5;
if (x > 3) {
  x = x + 1;
} else {
  x = x - 1;
}
while (x < 10) {
  x = x + 2;
}


//Function Declaration and Invocation
function add(a, b) {
  return a + b;
}
let result = add(5, 7);
console.log(result);


//Loops
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
sum =0;
var res = 3* 1.47;

let x = res;
}
console.log(sum);


//Nested Control Structures
let a = 3;
let b = 4;
if (a > 2) {
  if (b > 3) {
    console.log("Both conditions are true.");
  } else {
    console.log("Only the first condition is true.");
  }
} else {
  console.log("The first condition is false.");
}


//Array Manipulation
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(num => num * 2);
console.log(doubled);


//Object Declaration and Access
let person = {
  name: "Alice",
  age: 25,
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
person.greet();



// Error Handling with Try-Catch
try {
  let result = riskyFunction(); // Assume this function is not defined
} catch (error) {
  console.log("An error occurred: " + error.message);
}

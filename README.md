- 1️⃣ What is the difference between var, let, and const?

var, let, and const are used to declare variables.

var is an old method to declare variables. var can be redeclared and reassigned but this can cause unexpected error. it is function-scoped, which means it is accessible inside the whole function where it is declared.

let is block-scoped, it only works inside the block { } where it is declared (like inside an if or for block). let variable can be reassigned, but it cannot be redeclared in the same scope.

const is also is block-scoped as let, but its value cannot be reassigned after it is declared. it must also be initialized when declared.



- 2️⃣ What is the spread operator (...)?

spread operator (...) is used to spread, copy and combine values from an array or object into another.
example:

const arr1=[1, 2, 3]
const arr2=[...arr1, 4, 5]

console.log(arr2)
output:// [1, 2, 3, 4, 5]





- 3️⃣ What is the difference between map(), filter(), and forEach()?

map() is used to change each element of an array and create a new array with the results.

filter() is used to find element that match a condition. it returns a new array containing only the elements that pass the condition.

forEach() is used to loop through an array and perform an action for each element like for...of. it does not return a new array.



- 4️⃣ What is an arrow function?

arrow function is a shorter way to write functions. regular function and arrow function both do the same thing, but the arrow function uses =>
example
const add=(a,b)=>a+b




- 5️⃣ What are template literals?

template literals are used to write strings. backticks (`) are used instead of quotes. it can insert variables and write multi-line strings.
example

const name = "js";
const message = `hello, ${name}!`
console.log(message)
output:// hello, js!
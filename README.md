design-patterns
===============

Using JavaScript's prototype inheritance nature to apply sorting algorithms, object oriented programming concepts, and design patterns


To Run
===============
node sort-numbers.js

Goal
===============
Demonstrate how a few different design patterns can be used with JavaScript.

Design patterns used so far:
* Factory Method
* Command Pattern
* Strategy Pattern

Sorting Algorithms:
* Merge Sort
* Insertion Sort
* Quick Sort with a random pivot


Performance
==============
You can read about how I improved my Merge Sort performance here: http://douglasmak.com/dont-get-fancy-with-javascript/

* Merge Sort (10,000,000 random numbers):  16362  ms
* Insertion Sort (1,000,000 random numbers):  1535195  ms
* Quick Sort with a random pivot (10,000,000 random numbers):  9958  ms


Things to do
==============
* Implement FlyWeight pattern for the number generator
* Implement the Async library to run commands in parallel
* Implement sorting visualizations
* Implement other numbers orders (reverse, sorted, a few unique, etc...)

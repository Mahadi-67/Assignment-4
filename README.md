## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### 2. How do you create and insert a new element into the DOM?

### 3. What is Event Bubbling? And how does it work?

### 4. What is Event Delegation in JavaScript? Why is it useful?

### 5. What is the difference between preventDefault() and stopPropagation() methods?

--------------------------------------------------------------------------------------------------------------------

### Answers:

### 1. 
### getElementById
	Selected by-id only
	Returns-Single element

### getElementsByClassName
	Selected by-class
	Returns-Collection of HTML

### querySelector
	Selected by-CSS	
	Returns-First match value

### getElementById
	Selected by-CSS
	Returns-List of Node


### 2. 

 1. Create the element by Using this document.createElement():
 For Example : const newDiv = document.createElement("div");
 2. Now add content by writing newDiv.something = "Something";

 ### 3. 

 1. Event bubbling means an event starts from the target element and then bubbles up to its parent elements, all the way to document.

 ### 4.

 1. Event delegation means attaching one event listener to a parent element instead of multiple listeners on child elements.
 2. Works for dynamically added elements


 ### 5.

 1. preventDefault(): Stops browser’s default behavior.
 2. stopPropagation(): Stops event from moving to parent elements.


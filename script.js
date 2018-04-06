/*
  This web application helps a user calculate a GPA for their courses.

  User enters a name and grade for each course via a form. We build a list of these courses,
  and print the list to the page every time list changes (on form submit).

  When user clicks the "calculate" button, we get the average of the grades for each
  course in the list, and print it to the page.

  When user clicks "clear" button, the list of courses is emptied.
  The page is updated to remove the old list and any previously calculated GPA.

  Comments labeled TODO and BUGFIX must be done for the application to work properly.
  REVIEW comments are requests for you to use your judgement to optimize the code.
*/


// Global variable to hold list of courses.
var courseList = [];
// REVIEW: Would this be safer if variable was scoped to window.onload or addACourse functions?

// Assign handlers to page events.
window.onload = function(){
  document.querySelector("form#add-course").addEventListener("submit", addACourse)

  document.querySelector("button#clear").addEventListener("click", clearData)

  document.querySelector("button#calculate").addEventListener("click", calculateAverage)
  // REVIEW: Would it make more sense to make some handlers anonymous functions,
  // instead of defining them elsewhere and assigning them here?
}

// Triggered on form submit. Creates a new course object and pushes it into courseList array,
// clears content in form fields, prints courseList objects to the page.
// BUGFIX[done]: This function isn't working properly- nothing gets output to the list on form submit. solution: add event.preventDefault()
function addACourse(event){
  // mh added:
  event.preventDefault();

  var grade = parseFloat(this.elements["grade"].value);

  /*
    TODO: validate that "grade" value is a number between 1.0 and 4.0, stop processing if it is not.

    Checking 'grade typeof "number"' will always return true because we called parseFloat.
    We must instead check that it's value is not NaN.

    REVIEW: could we make it doubly safe by adding an HTML validation as well?
  */

  // Create the new course with values from the form, push it into array of courses.
  var newCourse = {
    name: this.elements["name"].value,
    grade: grade
  }
  console.log("grade: ", grade);

  courseList.push(newCourse)
  console.log("courseList: ", courseList);

  clearFormFields()
  outputList()
}

// Calculate the average of "grade" attribute for all objects in courseList array
// and print it in friendly message to page text.
function calculateAverage(){
  // Average GPA of courses equals the sum of all grades,
  // divided by the number of course objects in courseList
  var sum = 0
  for(var i=0;i<courseList.length;i++){
    sum += courseList[i].grade
  }
  var avg = sum / courseList.length
  document.getElementById("result").innerHTML = "Your overall GPA is " + avg;
}

// Removes GPA calculation from page text.
function clearGPA(){
  document.getElementById("result").innerHTML = null;
}

// Clears content in form fields.
function clearFormFields(){
  // TODO[done]: implement this function.
  
  document.getElementById("add-course").reset();

}

// Clear out list of courses and all content shown on the page
function clearData(){
  courseList = []
  clearFormFields()
  outputList()
}

// Prints courseList objects to the page in a readable way.
function outputList(){
  var list = document.getElementById("course-list");
  console.log("outputList got called")
  /*
    TODO[done]: Clear the existing contents of the "list" element. Then, for each object in courseList,
    create an li element that holds the course's name and grade, and append
    it to the "list" ul element.
  */
  console.log("list: ", list)  
  list.innerHTML = null; // or ""
   
  for(var i=0; i < courseList.length; i++){
    console.log("name: ", courseList[i].name, "  grade: ", courseList[i].grade)

    var newLi = document.createElement("li")
    newLi.innerHTML = "name: " + courseList[i].name + "  grade: " + courseList[i].grade
    list.appendChild(newLi)
  }
}

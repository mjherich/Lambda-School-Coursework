# Project School Test

A student that completes this project shows that they can:

## Introduction

## Instructions
Start with the school project - you can start with the project provided OR as a stretch goal, use your previous school project!

* In CourseService Add a method for findCourseById
  * Write a unit test for CourseServiceImpl findCourseById

* Write a unit test for CourseServiceImpl for delete by writing two unit tests:
  * Include a unit test called deleteFound
  * Include a unit test called deleteNotFound

* Write a unit test for CourseController for listAllCourses

* Write an integrate test for response time for GET /courses/courses 

* In CourseService Add a method for Adding a new course called save
* In CourseController add a controller to POST a new course POST /courses/course/add. Method should be named addNewCourse
  * The course data will contain course name and an instructor object (of an already existing instructor)
  * No students will be added to the course via this method
  
  * add an unit test for save
  * add an unit test for addNewCourse
  * add an integration test for POST /courses/course/add

## Stretch Goals
* In StudentService Add a method for Adding a new student called save
* In StudentController add a controller to POST a new student POST /students/student/add. Method should be named addNewStudent
  * This end point only has to add a student. No course information. As a Stretch, Stretch goal, have this end point add students to preexisting courses. 

  * In add an unit test for save
  * In add an unit test for addNewStudent
  * In an integration test for POST /students/student/add

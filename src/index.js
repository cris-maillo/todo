import { isToday, parseISO } from "date-fns";
import { ToDo } from "./ToDo.js";
import { displayList } from "./displayList.js";
import { displayProjects } from "./displayProject.js";
import jsonToDoList from '../dist/toDoList.json' assert {type: 'json'};

let projectList;
let toDoList;

// expand IIFE into a named function
(function () {
  if (
    !localStorage.getItem("localProjects") ||
    !localStorage.getItem("localDos")
  ) {
    toDoList = jsonToDoList;
    projectList = ["Inbox", "Due Today", "Coding"];
  } else {
    toDoList = JSON.parse(localStorage.getItem("localDos"));
    projectList = JSON.parse(localStorage.getItem("localProjects"));
  }

  //if can delete projects, this should be redone 
  // add in an error to show you can handle edge cases
  let activeProject = projectList[0];

  //review naming convention for IDs
  const toDoForm = document.getElementById("addform");
  const projectForm = document.getElementById("addprojectform");

  //would it be better practice if the function for the events were separated?
  //change event listener into button, would avoid using prevent Deafult
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let projectName = projectForm.elements["project"].value;
    // create addProject, argument string name project and separate
    projectList.push(projectName);
    
    displayProjects(projectList, toDoList);
  });

  toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = toDoForm.elements["title"].value;
    let dueDate = toDoForm.elements["dueDate"].value;
    let assignedProject = toDoForm.elements["project"].value;

    const parsedDate = parseISO(dueDate);
    let dueToday = isToday(parsedDate);

    // dueToday if it is tomorrow will not work, should review
    var newToDo = new ToDo(title, dueDate, assignedProject, dueToday);
    toDoList.push(newToDo);

    localStorage.setItem("localDos", JSON.stringify(toDoList));

    // sets the window to display the Project to do list of the last to do created
    // consider creting a function for this, as they always go together
    activeProject = assignedProject;
    displayList(activeProject, toDoList);
  });

  displayList(activeProject, toDoList);
  displayProjects(projectList, toDoList);

})();

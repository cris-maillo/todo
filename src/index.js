import { isToday, parseISO } from "date-fns";
import { ToDo } from "./ToDo.js";
import { displayList } from "./displayList.js";
import { displayProjects } from "./displayProject.js";

let projectList;
let toDoList;

// expand IIFE into a named function
(function () {
  if (
    !localStorage.getItem("localProjects") ||
    !localStorage.getItem("localDos")
  ) {
    // can use a module as an import for mock data
    toDoList = [
      {
        title: "Look Pretty",
        dueDate: "2022-07-21",
        completed: false,
        assignedProject: "Inbox",
        dueToday: false,
      },
      {
        title: "Finish To Do App",
        dueDate: "2022-07-21",
        completed: false,
        assignedProject: "Coding",
        dueToday: false,
      },
      {
        title: "Have Fun",
        dueDate: "2022-07-21",
        completed: false,
        assignedProject: "Inbox",
        dueToday: false,
      },
    ];
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

    // this could also be a class in conjunction with the line before, consider a toDoList class
    localStorage.setItem("localDos", JSON.stringify(toDoList));

    // add a comment explaining what this does
    // consider cerating a function for this, as they always go together
    activeProject = assignedProject;
    displayList(activeProject, toDoList);
  });

  displayList(activeProject, toDoList);
  displayProjects(projectList, toDoList);

})();

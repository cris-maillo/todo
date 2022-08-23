import { isToday, parseISO } from "date-fns";
import { ToDo } from "./newToDo.js";
import { displayList } from "./displayList.js";
import { displayProjects } from "./displayProject.js";

// better way or place to declare these?
var projectList;
var toDoList;

(function () {
  // check IFFE, does using one make sense???
  //should some of these functions be separated?
  
  if (
    localStorage.getItem("localProjects") == null ||
    localStorage.getItem("localDos") == null
  ) {
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

  let activeProject = projectList[0];

  const toDoForm = document.getElementById("addform");
  const projectForm = document.getElementById("addprojectform");

  //would it be better practice if the function for the events were separated? debug issues.
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let projectName = projectForm.elements["project"].value;
    projectList.push(projectName);
    displayProjects(projectList, toDoList);
  });

  toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //why does it work to declare here inside the function? wouldnt this have to be out
    let title = toDoForm.elements["title"].value;
    let dueDate = toDoForm.elements["dueDate"].value;

    let assignedProject = toDoForm.elements["project"].value;
    let dueToday;

    // can I streamline? is it better practice to streamline?
    const parsedDate = parseISO(dueDate);
    // better structure for these?
    if (isToday(parsedDate)) {
      dueToday = true;
    } else {
      dueToday = false;
    }

    var newToDo = new ToDo(title, dueDate, false, assignedProject, dueToday);
    toDoList.push(newToDo);
    activeProject = assignedProject;
    displayList(activeProject, toDoList);
  });

  displayList(activeProject, toDoList);
  displayProjects(projectList, toDoList);
})();

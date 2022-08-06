// import { compareAsc, format } from 'date-fns'

// format(new Date(2014, 1, 11), 'yyyy-MM-dd')
// //=> '2014-02-11'

// const dates = [
//   new Date(1995, 6, 2),
//   new Date(1987, 1, 11),
//   new Date(1989, 6, 10),
// ]
// dates.sort(compareAsc)
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]

import {ToDo} from "./newToDo.js";
import {markComplete} from "./markComplete.js";
import {deleteItem} from "./deleteItem.js";


const form  = document.getElementById('addform');
const projectForm  = document.getElementById('addprojectform');

var toDoList = [{title: '01hello', dueDate: '2022-07-21', completed: false, assignedProject: "Coding"}, {title: '02hello', dueDate: '2022-07-21', completed: true, assignedProject: "Inbox"}, {title: '03hello', dueDate: '2022-07-21', completed: false, assignedProject: "Coding"}];
var projects = ["Inbox", "Due Today", "Coding"]

let chosenProject = projects[0]

projectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let projectName = projectForm.elements["project"].value
  projects.push(projectName);
  displayProjects();
});

displayList(chosenProject);
displayProjects();

function displayList(chosenProject){

  console.log(chosenProject)

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = form.elements["title"].value
    let dueDate = form.elements["dueDate"].value
    let assignedProject = projects[1].projectName;
    var ToDo1 = new ToDo(title, dueDate, false, assignedProject)
    toDoList.push(ToDo1);
    console.log(toDoList)
    displayList(chosenProject);
  });

  const listContainer = document.getElementById("todos");
  
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.lastChild);
  }

  for (let i = 0; i < toDoList.length; i++){

    if (toDoList[i].assignedProject == chosenProject){
      let itemContainer = document.createElement("div");
      itemContainer.className = "todo";
      
      let item = document.createElement("div");
      item.className = "todoname";
      item.innerHTML = toDoList[i].title;
      
      let completeStatus = toDoList[i].completed;
      item.addEventListener("click", function() { markComplete(completeStatus, i, toDoList); } , false)

      if(toDoList[i].completed === true){
        item.classList = "completed";
      }

      let itemDate = document.createElement("div");
      itemDate.className = "dueDate";
      itemDate.innerHTML = toDoList[i].dueDate;

      let itemDelete = document.createElement("img");
      itemDelete.src = "img/trash-can.png";
      itemDelete.className = "itemDelete";
      itemDelete.addEventListener("click", function() { deleteItem(i, toDoList); } , false)
      itemDelete.width = 25;

      let itemLeft = document.createElement("div");
      itemLeft.className = "itemLeft";

      itemContainer.appendChild(item);
      itemLeft.appendChild(itemDate);
      itemLeft.appendChild(itemDelete);
      itemContainer.appendChild(itemLeft);
      listContainer.appendChild(itemContainer);
    }
  }
    
}

function displayProjects(){
  const projectContainer = document.getElementById("projectlist");
  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.lastChild);
  }

  for (let i = 0; i < projects.length; i++){
    let projectName = document.createElement("h3");
    projectName.innerHTML = projects[i];
    let projectID = projects[i];
    projectName.addEventListener("click", function() { switchProject(projectID); } , false)
    projectContainer.appendChild(projectName);
  }

}

function switchProject(projectID){
  chosenProject = projectID
  console.log(chosenProject)
  displayList(chosenProject)
}

export {displayList}







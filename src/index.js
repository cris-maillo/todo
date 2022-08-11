import {isToday, parseISO} from 'date-fns'
import {ToDo} from "./newToDo.js";
import {markComplete} from "./markComplete.js";
import {deleteItem} from "./deleteItem.js";

const form  = document.getElementById('addform');
const projectForm  = document.getElementById('addprojectform');

var projects;
var toDoList;
let chosenProject;


(function(){
  if (localStorage.getItem("localProjects") == null || localStorage.getItem("localDos") == null) {
    toDoList = [{title: 'Look Pretty', dueDate: '2022-07-21', completed: false, assignedProject: "Inbox", dueToday: false}, {title: 'Finish To Do App', dueDate: '2022-07-21', completed: false, assignedProject: "Coding", dueToday: false}, {title: 'Have Fun', dueDate: '2022-07-21', completed: false, assignedProject: "Inbox", dueToday: false}];
    projects = ["Inbox", "Due Today", "Coding"]
  }else {
    toDoList = JSON.parse(localStorage.getItem("localDos"))
    projects = JSON.parse(localStorage.getItem("localProjects"))
  }

  chosenProject = projects[0]
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let projectName = projectForm.elements["project"].value
    projects.push(projectName);
    displayProjects(projects);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = form.elements["title"].value
    let dueDate = form.elements["dueDate"].value

    const result = parseISO(dueDate)
    let assignedProject = form.elements["project"].value;
    let dueToday;
    if (isToday(result)){
      dueToday = true;
    }else{
      dueToday = false;
    }
    var ToDo1 = new ToDo(title, dueDate, false, assignedProject, dueToday)
    toDoList.push(ToDo1);
    chosenProject = assignedProject;
    displayList(chosenProject, toDoList);

  });
  displayList(chosenProject, toDoList);
  displayProjects(projects);
})();

function displayList(chosenProject, toDoList){
  localStorage.setItem("localDos", JSON.stringify(toDoList))

  console.log(localStorage.getItem("localDos"))


  const listContainer = document.getElementById("todos");
  const listHeading = document.getElementById("listHeading");

  while (listHeading.firstChild) {
    listHeading.removeChild(listHeading.lastChild);
  }

  let projectHeading = document.createElement("h2");
  projectHeading.innerHTML = chosenProject;
  listHeading.appendChild(projectHeading);
  
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.lastChild);
  }

  
  for (let i = 0; i < toDoList.length; i++){
    if ((chosenProject == "Inbox" || toDoList[i].assignedProject == chosenProject) || (chosenProject == "Due Today" && toDoList[i].dueToday == true)){
      let itemContainer = document.createElement("div");
      itemContainer.className = "todo";
      
      let item = document.createElement("div");
      item.className = "todoname";
      item.innerHTML = toDoList[i].title;
      
      let completeStatus = toDoList[i].completed;
      item.addEventListener("click", function() { markComplete(completeStatus, i, toDoList, chosenProject); } , false)
  
      if(toDoList[i].completed === true){
        item.classList = "completed";
      }
  
      let itemDate = document.createElement("div");
      itemDate.className = "dueDate";
      itemDate.innerHTML = toDoList[i].dueDate;
  
      let itemDelete = document.createElement("img");
      itemDelete.src = "img/trash-can.png";
      itemDelete.className = "itemDelete";
      itemDelete.addEventListener("click", function() { deleteItem(i, toDoList, chosenProject); } , false)
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

function displayProjects(projects){
  localStorage.setItem("localProjects", JSON.stringify(projects))

  const projectContainer = document.getElementById("projectlist");
  const select = document.getElementById("projectSelect");

  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.lastChild);
  }

  while (select.firstChild) {
    select.removeChild(select.lastChild);
  }

  for (let i = 0; i < projects.length; i++){
    let projectName = document.createElement("h1");
    projectName.innerHTML = projects[i];
    let chosenProject = projects[i];
    projectName.addEventListener("click", function() { displayList(chosenProject, toDoList); } , false)
    projectContainer.appendChild(projectName);

    if(projects[i] != "Due Today"){
      var opt = projects[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }

}

export {displayList}







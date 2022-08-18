import {isToday, parseISO} from 'date-fns'
import {ToDo} from "./newToDo.js";
import {markComplete} from "./markComplete.js";
import {deleteItem} from "./deleteItem.js";

// better way or place to declare these?
var projectList;
var toDoList;

(function(){

  // check IFFE, does it make sense???

  if (localStorage.getItem("localProjects") == null || localStorage.getItem("localDos") == null) {
    toDoList = [{title: 'Look Pretty', dueDate: '2022-07-21', completed: false, assignedProject: "Inbox", dueToday: false}, {title: 'Finish To Do App', dueDate: '2022-07-21', completed: false, assignedProject: "Coding", dueToday: false}, {title: 'Have Fun', dueDate: '2022-07-21', completed: false, assignedProject: "Inbox", dueToday: false}];
    projectList = ["Inbox", "Due Today", "Coding"]
  }else {
    toDoList = JSON.parse(localStorage.getItem("localDos"))
    projectList = JSON.parse(localStorage.getItem("localProjects"))
  }

  let activeProject = projectList[0]

  const toDoForm  = document.getElementById('addform');
  const projectForm  = document.getElementById('addprojectform');

  //would it be better practice if the function for the events were separated? debug issues.
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let projectName = projectForm.elements["project"].value
    projectList.push(projectName);
    displayProjects(projectList);
  });

  toDoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //why does it work to declare here inside the function? wouldnt this have to be out
    let title = toDoForm.elements["title"].value;
    let dueDate = toDoForm.elements["dueDate"].value;

    let assignedProject = toDoForm.elements["project"].value;
    let dueToday;

    // can I streamline? is it better practice to streamline?
    const parsedDate = parseISO(dueDate);
    // better structure for these?
    if (isToday(parsedDate)){
      dueToday = true;
    }else{
      dueToday = false;
    }

    var newToDo = new ToDo(title, dueDate, false, assignedProject, dueToday)
    toDoList.push(newToDo);
    activeProject = assignedProject;
    displayList(activeProject, toDoList);
  });

  displayList(activeProject, toDoList);
  displayProjects(projectList);

})();

function displayList(activeProject, toDoList){
  localStorage.setItem("localDos", JSON.stringify(toDoList))

  const listHeading = document.getElementById("listHeading");
  // check this? is there a better way to remove only child?
  listHeading.removeChild(listHeading.lastChild);

  let projectHeading = document.createElement("h2");
  projectHeading.innerHTML = activeProject;
  // better way than appending??
  listHeading.appendChild(projectHeading);
  
  const listContainer = document.getElementById("todos");
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.lastChild);
  }

  
  for (let i = 0; i < toDoList.length; i++){
    // is this long if statement okay? would I have to call a separate function?
    if ((activeProject == "Inbox" || toDoList[i].assignedProject == activeProject) || (activeProject == "Due Today" && toDoList[i].dueToday == true)){
      
      let itemContainer = document.createElement("div");
      itemContainer.className = "todo";
      
      let item = document.createElement("div");
      item.className = "todoname";
      item.innerHTML = toDoList[i].title;
      
      let completeStatus = toDoList[i].completed;
      item.addEventListener("click", function() { markComplete(completeStatus, i, toDoList, activeProject); } , false)
  
      if(toDoList[i].completed === true){
        item.classList = "completed";
      }
  
      let itemDate = document.createElement("div");
      itemDate.className = "dueDate";
      itemDate.innerHTML = toDoList[i].dueDate;
  
      let itemDelete = document.createElement("img");
      itemDelete.src = "img/trash-can.png";
      itemDelete.className = "itemDelete";

      //why did I add false to the end of the event listener
      itemDelete.addEventListener("click", function() { deleteItem(i, toDoList, activeProject); } , false)
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

function displayProjects(projectList){
  localStorage.setItem("localProjects", JSON.stringify(projectList))

  const projectContainer = document.getElementById("projectlist");
  const projectDropdown = document.getElementById("projectSelect");

  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.lastChild);
  }

  while (projectDropdown.firstChild) {
    projectDropdown.removeChild(projectDropdown.lastChild);
  }

  for (let i = 0; i < projectList.length; i++){
    let projectName = document.createElement("h1");
    projectName.innerHTML = projectList[i];
    let activeProject = projectList[i];
    projectName.addEventListener("click", function() { displayList(activeProject, toDoList); } , false)
    projectContainer.appendChild(projectName);

    if(projectList[i] != "Due Today"){
      var dropdownOption = document.createElement("option");
      dropdownOption.textContent = projectList[i];
      dropdownOption.value = projectList[i];
      projectDropdown.appendChild(dropdownOption);
    }
  }

}

export {displayList}







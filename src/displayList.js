import { markComplete } from "./markComplete.js";
import { deleteItem } from "./deleteItem.js";

function displayList(activeProject, toDoList) {
    //review this entire block
    const listHeading = document.getElementById("listHeading");
    // check this? is there a better way to remove only child?
    //add id to the h2, instead of making it a child
    listHeading.removeChild(listHeading.lastChild);
    let projectHeading = document.createElement("h2");
    projectHeading.innerHTML = activeProject;
    // better way than appending??
    listHeading.appendChild(projectHeading);

    const listContainer = document.getElementById("todos");
    listContainer.innerHTML = "";

    //change to forEach loop
    // toDoList.forEach((element, i) => {
    // toDoList.forEach(({title, completed, dueDate}, i) => {

    // });

    for (let i = 0; i < toDoList.length; i++) {

      if (
         // optional: this could be transformed into a switch functino
        activeProject == "Inbox" ||
        activeProject == toDoList[i].assignedProject  ||
        (activeProject == "Due Today" && toDoList[i].dueToday == true)
      ) {
        let itemContainer = document.createElement("div");
        itemContainer.className = "todo";
  
        let item = document.createElement("div");
        // check naming conventions class names
        item.className = "todoname";
        item.innerHTML = toDoList[i].title;

  
        let completeStatus = toDoList[i].completed;
        item.classList = completeStatus ? "completed": "";
        item.addEventListener(
          "click",
          function () {
            markComplete(completeStatus, i, toDoList, activeProject);
          },
          false
        );
  
        
        let itemDate = document.createElement("div");
        itemDate.className = "dueDate";
        itemDate.innerHTML = toDoList[i].dueDate;
  
        let itemDelete = document.createElement("img");
        itemDelete.src = "img/trash-can.png";
        itemDelete.className = "itemDelete";
        itemDelete.width = 25;
  
        itemDelete.addEventListener(
          "click",
           () => {
            deleteItem(i, toDoList, activeProject);
          },
          false
        );
        
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

export{displayList}
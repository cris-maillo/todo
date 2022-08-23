import { markComplete } from "./markComplete.js";
import { deleteItem } from "./deleteItem.js";

function displayList(activeProject, toDoList) {
    localStorage.setItem("localDos", JSON.stringify(toDoList));
  
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
  
    for (let i = 0; i < toDoList.length; i++) {
      // is this long if statement okay? would I have to call a separate function?
      if (
        activeProject == "Inbox" ||
        toDoList[i].assignedProject == activeProject ||
        (activeProject == "Due Today" && toDoList[i].dueToday == true)
      ) {
        let itemContainer = document.createElement("div");
        itemContainer.className = "todo";
  
        let item = document.createElement("div");
        item.className = "todoname";
        item.innerHTML = toDoList[i].title;
  
        let completeStatus = toDoList[i].completed;
        item.addEventListener(
          "click",
          function () {
            markComplete(completeStatus, i, toDoList, activeProject);
          },
          false
        );
  
        if (toDoList[i].completed === true) {
          item.classList = "completed";
        }
  
        let itemDate = document.createElement("div");
        itemDate.className = "dueDate";
        itemDate.innerHTML = toDoList[i].dueDate;
  
        let itemDelete = document.createElement("img");
        itemDelete.src = "img/trash-can.png";
        itemDelete.className = "itemDelete";
  
        //why did I add false to the end of the event listener
        itemDelete.addEventListener(
          "click",
          function () {
            deleteItem(i, toDoList, activeProject);
          },
          false
        );
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

export{displayList}
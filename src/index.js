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


const form  = document.getElementById('addform');
const listContainer = document.getElementById("todos");

var toDoList = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let title = form.elements["title"].value
  let dueDate = form.elements["dueDate"].value
  var ToDo1 = new ToDo(title, dueDate, false)
  toDoList.push(ToDo1);
  console.log(toDoList[0].title)
  console.log(toDoList)
  displayList();
});

function displayList(){
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.lastChild);
    }
    for (let i = 0; i < toDoList.length; i++){
  
      let itemContainer = document.createElement("div");
      itemContainer.className = "todo";
      
      let item = document.createElement("div");
      item.className = "todoname";
      item.id = i;
      item.innerHTML = toDoList[i].title;
      item.addEventListener("click", toggleComplete());
  
      let itemDate = document.createElement("div");
      itemDate.className = "dueDate";
      itemDate.innerHTML = toDoList[i].dueDate;
  
      itemContainer.appendChild(item);
      itemContainer.appendChild(itemDate);
      listContainer.appendChild(itemContainer);
    }
    
}



function toggleComplete(){
  // console.log(this.listContainer.childNodes[0].innerHTML)
  // let i = toDoList.findIndex(toDo => toDo.title === this.parentNode.childNodes[0].innerHTML);
  //   if(toDoList[i].completed === true){
  //     toDoList[i].completed = false;
  //     toDoList[i].classList.remove("completed");
  //   }
  //   else{
  //     toDoList[i].completed = true;
  //     toDoList[i].classList = "completed";
  //   }
  console.log("need to figure this out")
    
}








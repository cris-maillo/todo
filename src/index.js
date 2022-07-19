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

console.log("hello")

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
      item.innerHTML = toDoList[i].title;

      // add function to each item

      // check if item is complete

      //

      console.log(toDoList[i].completed)

      let completeStatus = toDoList[i].completed;

      item.addEventListener("click", function() { markComplete(completeStatus, i); } , false)

      if(toDoList[i].completed === true){
        item.classList = "completed";
      }
  
      let itemDate = document.createElement("div");
      itemDate.className = "dueDate";
      itemDate.innerHTML = toDoList[i].dueDate;
  
      itemContainer.appendChild(item);
      itemContainer.appendChild(itemDate);
      listContainer.appendChild(itemContainer);
    }
    
}

function markComplete(completeStatus, i) {
  console.log("status" + completeStatus)

  if(completeStatus === true){
    toDoList[i].completed = false;
    toDoList[i].classList = "todoname";
  }
  else{
    toDoList[i].completed = true;
    console.log(toDoList[i].completed);
    console.log(toDoList)
    toDoList[i].classList = "todoname completed";
  }
  displayList()
}










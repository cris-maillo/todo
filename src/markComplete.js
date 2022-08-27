import {displayList} from "./displayList.js";

const markComplete = (completeStatus, i, toDoList, chosenProject) => {
    if(completeStatus === true){
        toDoList[i].completed = false;
        toDoList[i].classList = "todoname";
    }
    else{
        toDoList[i].completed = true;
        toDoList[i].classList = "todoname completed";
    }
    displayList(chosenProject, toDoList)
}

export {markComplete}
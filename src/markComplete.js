import {displayList} from "./displayList.js";

// why am I calling chosenProject
const markComplete = (completeStatus, i, toDoList, chosenProject) => {
    console.log("he")
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
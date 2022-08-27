import {displayList} from "./displayList.js";

function deleteItem(i, toDoList, chosenProject){
    toDoList.splice(i, 1);

    localStorage.setItem("localDos", JSON.stringify(toDoList));

    displayList(chosenProject, toDoList)
}

export {deleteItem}
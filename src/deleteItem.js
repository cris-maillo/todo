import {displayList} from "./displayList.js";

// i think this is perfect, correct me if im wrong.
function deleteItem(i, toDoList, chosenProject){
    toDoList.splice(i, 1);
    displayList(chosenProject, toDoList)
}

export {deleteItem}
import {displayList} from "./index.js";

function deleteItem(i, toDoList, chosenProject){
    toDoList.splice(i, 1);
    displayList(chosenProject)
}

export {deleteItem}
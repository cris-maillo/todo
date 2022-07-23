import {displayList} from "./index.js";

function deleteItem(i, toDoList){
    toDoList.splice(i, 1);
    displayList()
}

export {deleteItem}
const markComplete = (completeStatus, i, toDoList) => {

    if(completeStatus === true){
        toDoList[i].completed = false;
        toDoList[i].classList = "todoname";
    }
    else{
        toDoList[i].completed = true;
        toDoList[i].classList = "todoname completed";
    }

    console.log(toDoList)
    displayList()
}

export {markComplete}
//change file name to tido

class ToDo{
    constructor(title, dueDate,  assignedProject, dueToday){
        this.title = title;
        this.dueDate = dueDate;
        this.completed = false;
        this.assignedProject = assignedProject;
        this.dueToday = dueToday;
    }
  }

export {ToDo}
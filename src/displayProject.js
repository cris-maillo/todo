import {displayList} from "./displayList.js";

function displayProjects(projectList, toDoList) {
    localStorage.setItem("localProjects", JSON.stringify(projectList));
  
    const projectContainer = document.getElementById("projectlist");
    const projectDropdown = document.getElementById("projectSelect");
  
    while (projectContainer.firstChild) {
      projectContainer.removeChild(projectContainer.lastChild);
    }
  
    while (projectDropdown.firstChild) {
      projectDropdown.removeChild(projectDropdown.lastChild);
    }
  
    for (let i = 0; i < projectList.length; i++) {
      let projectName = document.createElement("h1");
      projectName.innerHTML = projectList[i];
      let activeProject = projectList[i];
      projectName.addEventListener(
        "click",
        function () {
          displayList(activeProject, toDoList);
        },
        false
      );
      projectContainer.appendChild(projectName);
  
      if (projectList[i] != "Due Today") {
        var dropdownOption = document.createElement("option");
        dropdownOption.textContent = projectList[i];
        dropdownOption.value = projectList[i];
        projectDropdown.appendChild(dropdownOption);
      }
    }
  }

export {displayProjects}
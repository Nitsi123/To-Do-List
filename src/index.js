import {createHome} from "./schedule"
import createToday from "./today"
import createWeek from "./week"
import createProjectList from "./projects"

//createHome()
//createToday()

const loadWebpage = (() => {
    createHome()
    clearProject()
    createProjectList()
})();

const home = document.querySelector(".home")
const today = document.querySelector(".today")
const week = document.querySelector(".week")

function clearContent(){
    const content = document.querySelector(".task-container")
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

function clearProject(){
    const project = document.querySelector(".projects")
    while (project.firstChild) {
        project.removeChild(project.firstChild);
    }
}

function clearAddTaskButton()
{
    const button = document.querySelector(".task")
    if(button != null){
        button.remove()
    } 
}
home.addEventListener("click", function()
{
    clearContent()
    clearAddTaskButton()
    createHome()
    clearProject()
    createProjectList()
})

today.addEventListener("click", function(){

    clearContent()
    clearAddTaskButton()
    createToday()
})

week.addEventListener("click", function(){

    clearContent()
    clearAddTaskButton()
    createWeek()
})
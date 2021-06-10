import createTask from "./createTask";
import createProjectList from "./projects";


function createHome()
{
    const content = document.querySelector(".content");
    const taskContainer = document.querySelector(".task-container")
    const heading = document.querySelector(".content-head");
    heading.innerText ="";
    heading.innerText = "Home"
    const keys = Object.keys(localStorage)
    createTaskList(keys)

    createAddTask()

    deleteTasks()
    taskContainer.addEventListener("click", function(e){deleteTasks()})
}

function addToLocalStorage(title, description, project, date){
    const task = createTask(title, description, project, date);
    let keys = Object.keys(localStorage)
    localStorage.setItem(task.title, JSON.stringify(task));
    const keyList = Object.keys(localStorage)
    createTaskList(keys)
}

function createTaskList(keys)
{
    const content = document.querySelector(".content");
    const taskContainer = document.querySelector(".task-container")

    while(taskContainer.firstChild)
    {
        taskContainer.removeChild(taskContainer.firstChild)
    }

    let title = document.createElement("p")
    let description = document.createElement("p")
    let project = document.createElement("p")
    let date = document.createElement("p")
    let done = document.createElement("p")
    title.innerText = "Title"
    description.innerText = "Description"
    project.innerText = "Project"
    date.innerText = "Due Date"
    done.innerText = "Mark Done"

    title.setAttribute("style", "font-weight: bold")
    description.setAttribute("style", "font-weight: bold")
    project.setAttribute("style", "font-weight: bold")
    date.setAttribute("style", "font-weight: bold")
    done.setAttribute("style", "font-weight: bold")

    taskContainer.appendChild(title)
    taskContainer.appendChild(description)
    taskContainer.appendChild(project)
    taskContainer.appendChild(date)
    taskContainer.appendChild(done)

    let i =0
    while(i < keys.length)
    {
        let title = document.createElement("p")
        let description = document.createElement("p");
        let project = document.createElement("p")
        let date = document.createElement("p")
        let doneImg = document.createElement("img")
        let temp = keys[i].replace(" ", "-")
        title.classList.add(temp)
        description.classList.add(temp)
        project.classList.add(temp)
        date.classList.add(temp)

        doneImg.classList.add(temp)
        doneImg.setAttribute("src", "dist/images/done.svg")
        doneImg.setAttribute("data-key", keys[i])
        doneImg.classList.add("mark-done")
        let myobj = {};
        myobj = JSON.parse(localStorage.getItem(keys[i]))
        title.innerText = myobj.title
        description.innerText = myobj.description
        project.innerText = myobj.project
        date.innerText = myobj.date;
        taskContainer.appendChild(title)
        taskContainer.appendChild(description)
        taskContainer.appendChild(project)
        taskContainer.appendChild(date)
        taskContainer.appendChild(doneImg)
        i++;
    }    
}

function deleteTasks(){

    const doneImgList = Array.from(document.querySelectorAll(".mark-done"))
    doneImgList.forEach(doneImg => {
        doneImg.addEventListener("click", function(e)
        {
            console.log(e);
            const key = e.target.getAttribute("data-key")
            localStorage.removeItem(key)
            const temp = key.replace(" ", "-")
            const getKeyList = Array.from(document.querySelectorAll("."+temp))
            getKeyList.forEach(element => {
                element.remove()
            });
        })
    });

    clearProject()
    createProjectList()

}

function createAddTask()
{
    const content = document.querySelector(".content");
    const taskContainer = document.querySelector(".task-container")
    const button = document.createElement("div");
    const addTaskImg = document.createElement("img")
    const addTaskText = document.createElement("p")
    addTaskImg.setAttribute("src", "dist/images/add-task.svg")
    addTaskText.innerText = "Add Task";
    button.appendChild(addTaskImg)
    button.appendChild(addTaskText)
    button.setAttribute("style", "display:flex; margin-top:50px;")
    addTaskText.setAttribute("style", "font-size:2rem; padding-left: 10px")
    button.classList.add("task")
    content.appendChild(button)

    const form = document.querySelector(".form")
    button.addEventListener("click", function(e)
    {
        form.classList.toggle("visible")
        button.setAttribute("style", "display:none")
        taskContainer.setAttribute("style", "display:none")
    })

    const cancel = document.querySelector("#cancel")
    cancel.addEventListener("click", function(){
        form.classList.toggle("visible")
        button.setAttribute("style", "display:flex; margin-top:50px;")
        taskContainer.removeAttribute("style")
    })

    form.addEventListener("submit", function(e){
        console.log(e)
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let project = document.getElementById("project").value
        let date = document.getElementById("date").value
        addToLocalStorage(title, description, project, date)
    })
}

function clearProject(){
    const project = document.querySelector(".projects")
    while (project.firstChild) {
        project.removeChild(project.firstChild);
    }
}

export {createHome, createTaskList, deleteTasks, createAddTask}
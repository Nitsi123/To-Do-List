import { createTaskList, deleteTasks, createAddTask} from './schedule';

function createProjectList(){
    const keys = Object.keys(localStorage)
    
    let i=0;
    let projectList = []
    while(i<keys.length)
    {
        let myobj ={};
        myobj = JSON.parse(localStorage.getItem(keys[i]))
        projectList.push(myobj.project)
        i++;
    }
    const projectsObj = projectList.reduce(function(obj, item) {
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
      }, {});

    const projectKeys = Object.keys(projectsObj)
    console.log(projectKeys)

    const projectContainer = document.querySelector(".projects");
    i=0;
    while(i<projectKeys.length)
    {
      const projectDiv = document.createElement("div");
      projectDiv.innerText = projectKeys[i];
      projectDiv.classList.add("project-div");
      projectContainer.appendChild(projectDiv);
      i++;
    }
    
    const projectDivList = Array.from(document.querySelectorAll(".project-div"));

    projectDivList.forEach(projectDiv => { projectDiv.addEventListener("click", function(e){

      const key = e.target.innerText;
      fillContainer(key)

    })
      
    });
}

function fillContainer(key){
  clearContent()
  clearAddTaskButton()
  const content = document.querySelector(".content");
  const heading = document.querySelector(".content-head");
  heading.innerText ="";
  heading.innerText = key
  let keyList = [];

  const keys = Object.keys(localStorage)
  let i =0
  while(i< keys.length)
  {
      let myobj = {}
      myobj = JSON.parse(localStorage.getItem(keys[i]))
      
      if(key == myobj.project)
      {
          keyList.push(keys[i])
      }
      i++;
  }
  createTaskList(keyList)
  const formProject = document.getElementById("project")
  formProject.value = key;
  createAddTask()
  deleteTasks()
  const taskContainer = document.querySelector(".task-container")
  taskContainer.addEventListener("click", function(e){deleteTasks()})

}

function clearContent(){
  const content = document.querySelector(".task-container")
  while (content.firstChild) {
      content.removeChild(content.firstChild);
  }
}

function clearAddTaskButton()
{
  const button = document.querySelector(".task")
  if(button != null){
      button.remove()
  } 
}

export default createProjectList
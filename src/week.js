import isThisWeek from 'date-fns/isThisWeek'
import { createTaskList, deleteTasks} from './schedule';

function createWeek(){
    const content = document.querySelector(".content");
    const heading = document.querySelector(".content-head");
    heading.innerText ="";
    heading.innerText = "This Week"
    let keyList = [];

    const keys = Object.keys(localStorage)
    let i =0
    while(i< keys.length)
    {
        let myobj = {}
        myobj = JSON.parse(localStorage.getItem(keys[i]))
        let date = myobj.date;
        let temp = date.split("-")
        const month = temp[1] -1
        const d = new Date()
        const day = d.getDay()	
        let res = isThisWeek(new Date(temp[0], month, temp[2]),{weekStartsOn: day})
        if(res)
        {
            keyList.push(keys[i])
        }
        i++;
    }
    createTaskList(keyList)
    deleteTasks()
    const taskContainer = document.querySelector(".task-container")
    taskContainer.addEventListener("click", function(e){deleteTasks()})
}

export default createWeek
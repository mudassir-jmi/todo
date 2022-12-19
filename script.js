const title = document.querySelector('#title')
const description = document.querySelector('#description')
const form = document.querySelector('form')
const container = document.querySelector('.container')

// const tasks = [];
const tasks = localStorage.getItem("tasks") 
? JSON.parse(localStorage.getItem("tasks")) : [];
ShowTasks();

function ShowTasks () {
   tasks.map((value, index) => {
     const div = document.createElement("div")
     div.setAttribute("class","task")

     const innerDiv = document.createElement("div")
     div.append(innerDiv);

     const p = document.createElement("p")
     p.innerText = value.title;
     innerDiv.append(p)

     const span = document.createElement("span")
     span.innerText = value.description;
     innerDiv.append(span)

     const button = document.createElement("button")
     button.setAttribute("id", "deleteBtn")
     button.innerText = "-";
    // To delete tasks on click on  delete button
    button.addEventListener("click", () => {
        removeTasks();    // first of all remove previous tasks
        tasks.splice(index, 1);
        localStorage.setItem("tasks",JSON.stringify(tasks));
        ShowTasks();
    })
     div.append(button);
     container.append(div);
   })
}
// remove all previous tasks
function removeTasks() {
    tasks.forEach(() => {
        const div = document.querySelector(".task");
        div.remove();
    })
}

form.addEventListener('submit',(e)=> {
  e.preventDefault();
  removeTasks(); // call for remove privious tasks
  tasks.push({
    title: title.value,
    description: description.value,
  })
  title.value = "";
  description.value = "";
//   Save Tasks in localStorage becuase if you refresh page the tasks is not gone
  localStorage.setItem("tasks",JSON.stringify(tasks));
  console.log(tasks);
  ShowTasks();
})
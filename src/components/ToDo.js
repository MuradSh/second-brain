import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Textfield from './Textfield.js';
import Option from './Option.js';

const API_URL = 'http://localhost:80/react/db.php';


const Tasks = ({newTasks,pageToShow}) => {

  const [tasks,setTasks] = useState([])

  useEffect(() => {
    console.log(pageToShow)
      axios.post(API_URL,{getTasks: ""})
      .then(res => {
          // reverse the assign, because it sorts by ID ASC instead of desc
          setTasks(Object.values(Object.assign([], res.data).reverse()))
        })
  },[]);

  function completed(id,event){
    axios.post(API_URL,{completed: id})
    .then(res => {
        if(res.data){

           event.target.className = "task_li removing"
          setTimeout(function () {
           event.target.remove()
         }, 180);
        }
      })
  }
  const style = {
    display: (pageToShow==0) ? "inline-block":"none"
  }
  return (
    <>
      <ul className="task_list" style={style}>
          {newTasks.map((value, index) => (
              <li class="task_li" onClick={((e) => completed(value[0],e))} key={(value+""+index)}>{value}</li>
              ))
          }
          {tasks.map((value, index) => (
          value[2]==0 && <li className="task_li" onClick={((e) => completed(value[0],e))} key={value[0]}>{value[1]}</li>
          ))}
      </ul>
    </>
  )
}


const Completed = ({pageToShow}) => {

  const [tasks,setTasks] = useState([])
  useEffect(() => {
    console.log(pageToShow)
      axios.post(API_URL,{getTasks: ""})
      .then(res => {
          // reverse the assign, because it sorts by ID ASC instead of desc
          setTasks(Object.values(Object.assign([], res.data).reverse()))
        })
  },[]);

  const style = {
    display: (pageToShow==1) ? "inline-block":"none"
  }
  return (
    <>
      <ul className="task_list" style={style}>
          {tasks.map((value, index) => (
          value[2]==1 && <li className="task_li" key={value[0]}>{value[1]}</li>
          ))}
      </ul>
    </>
  )
}


const ToDo = ({show}) => {

  const [pageToShow,setPageToShow] = useState("To Do")
  const [newTasks,setNewTasks] = useState([]) // for tasks newly added
  function monitorKeys(e){
    if(e.keyCode==13){
        axios.post(API_URL,{task: e.target.value})
        .then(res => {
            console.log(res.data);
            e.target.value = ""
          })
          setNewTasks([...newTasks,e.target.value])
    }
  }

  return (
    <div>
      <Option changePage={()=> setPageToShow("To Do")} showing={pageToShow} text="To Do"/>
      <Option changePage={()=> setPageToShow("Completed")}  showing={pageToShow} text="Completed" />
      <br />
      <Textfield placeholder="Add Task" Id="addTask" onkeydown={monitorKeys}/>
      <Tasks  newTasks={newTasks} pageToShow={(pageToShow=="To Do") ? 0 : 1} />
      <Completed pageToShow={(pageToShow=="To Do") ? 0 : 1} />
    </div>
  )
}

export default ToDo

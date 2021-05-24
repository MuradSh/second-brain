import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const Inputs = (props) => {
    return <input onKeyDown={props.onkeydown} type="text" placeholder="Add Task"  className="addTask" />
}

const Option = ({text,changePage,showing}) => {
  console.log(text==showing)
  console.log(text+" "+showing)

  return (
    <div style={(text==showing) ? headingStyle : null} onClick={changePage} className="option">{text}</div>
  )
}
const headingStyle = {
  background: '#e7cac2',
  boxShadow: '3px 0px 5px darkgray'
}


const ToDo = ({show}) => {

  const [pageToShow,setPageToShow] = useState("To Do")

  function monitorKeys(e){
    if(e.keyCode==13){
        axios.post('http://localhost:80/react/db.php',{task: e.target.value})
        .then(res => {
            console.log(res.data);
          })
    }
  }

  return (
    <div>
    <Option changePage={()=> setPageToShow("To Do")} showing={pageToShow} text="To Do"/>
    <Option changePage={()=> setPageToShow("Completed")}  showing={pageToShow} text="Completed" />
    <br />
    <Inputs onkeydown={monitorKeys}/>
    </div>
  )
}

export default ToDo

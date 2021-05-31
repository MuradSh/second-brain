import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Textfield from './Textfield.js';
const API_URL = 'http://localhost:80/react/db.php';


const Notes = () => {

  const borderColors = ["#e47a8d","#ff9573","#33bb99a","#9a9696","#70bad6","#e8864f","#8bc34a"]
  const [notes,setNotes] = useState([])
  const [newNotes,setNewNotes] = useState([])
  const [showPage,setShowPage] = useState(["Notes"])
  const [comments,setComments] = useState([""])

  useEffect(() => {
        axios.post(API_URL,{getNotes: ""})
        .then(res => {
            // reverse the assign, because it sorts by ID ASC instead of desc
            setNotes(Object.values(Object.assign([], res.data).reverse()))
            console.log(res.data)
          })
  },[]);


  function togglePage(){
    setShowPage((showPage=="Notes") ? "Add" : "Notes")
  }

  function monitorCommentsInput(e){
    let number = e.target.getAttribute("data-number");
    let comment = comments.slice()
    comment[number]=e.target.value
    setComments(comment)
  }

  function addTask(){
    axios.post(API_URL,{addNote: document.getElementById("addNote").value, comments: comments})
    .then(res => {
        console.log(res.data)
      }
    )
  }

  return (
    <div className="notes_wrapper">
      <input type="button" value={(showPage=="Notes" ? "+" : "←")} onClick={togglePage} className="addNoteButton" />
      <br />
      { (showPage=="Notes") ?
        <>
          {notes.map((note,index) => {
            return <div key={index} className="noteCard" style={{borderColor:borderColors[Math.floor(Math.random() * borderColors.length)]}}>
              <span>{note}</span>
            </div>
          })}
        </>
        :
        <>
        <Textfield placeholder="Add Note" Id="addNote" />
        <br />
        { comments.map((comment,index) => {
          return <div key={index}>
          {index==comments.length-1 && <input type="button" value="+" onClick={()=>{setComments([...comments,""])}} className="addCommentButton"/>}
          <Textfield key={index} number={index} onblur={monitorCommentsInput} placeholder="Add Comment" Id="addComment" />
          </div>
        })
        }
        <br />
        <input type="button" onClick={addTask} value="Add" className="submitNoteButton"/>
        </>
      }
  </div>
  )
}

export default Notes

import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Textfield from './Textfield.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


const API_URL = 'http://localhost:80/react/db.php';
// TODO AFTER SENDING ENTRY CLEAR THE TEXTAREA
const Journal = () => {


  const [showWrite, setShowWrite] = useState(true); // show Write page
  const [entries,setEntries] = useState([]);
  const [readingEntryId, setReadingEntryId] = useState(0);
  const [entry,setEntry] = useState();
  const [passCheck,setPassCheck] = useState(false);
  const [enteredPass,setEnteredPass] = useState("a");



  useEffect(() => {
    axios.post(API_URL,{"getEntries": 1,"pass":enteredPass})
    .then(res => {
        setEntries(res.data)
      })
  }, [enteredPass])

  function submitEntry(){
    var entryAPI = document.getElementById("journalTA").value;
    var entryTitle = document.getElementById("entryTitle").value;
    axios.post(API_URL,{"addEntry": entryAPI,"entryTitle":entryTitle,"pass":enteredPass})
    .then(res => {
        if(res.data.length==0){
          document.getElementById("journalTA").value = ""
        }else{
          alert(res.data)
        }

      })
  }

  function monitorKeys(e){
    if(e.keyCode==13){
        axios.post(API_URL,{"passwordJournal": e.target.value})
        .then(res => {
            if (res.data===1) {
              setEnteredPass(e.target.value);
              setPassCheck(true);
              // setTimeout(function(){ fetchEntries() }, 1000);
            }else{
              alert("WRONG!");
            }
          })
    }
  }

  if(passCheck){
    return (
      <Router>
        <input type="button" value={(showWrite ? "Change to Read" : "Change to Write")} onClick={()=> {setReadingEntryId(0); setShowWrite(!showWrite)}} className="changeJournalPage" />
        <br/>
        { readingEntryId ==0 ?
          showWrite ?
            <>
              <Textfield placeholder="Title" id="entryTitle" />
              <p />
              <textarea placeholder="Entry" id="journalTA" className="journalTextArea"></textarea>
              <input onClick={submitEntry} type="button" value="Save" className="saveEntry" />
            </>
            :
            <>
              { Object.keys(entries).map((entry,index) => {
                return <Link to={entry} key={index}><div onClick={() => {setReadingEntryId(entry); setEntry(entries[entry][1])}} className="journalEntry">
                  <span>{entries[entry][0]}</span>
                </div>
              </Link>
              })}
            </>

        :
        <Switch>
            <Route path="/:id" children={<ShowEntry entry={entry} />}></Route>
        </Switch>
        }
      </Router>
    )
  }else{
    return (
      <div className="passwordWrap">
        <h1>
          Please enter password
        </h1>
        <Textfield placeholder="Password" id="addNote" type="password" onKeyDown={monitorKeys} />
        <br />
      </div>
    )
  }
}

export default Journal

const ShowEntry = ({entry}) => {
  let { id } = useParams();
  useEffect(() => {
    console.log(entry);
  },[])


  return (
    <div className="entryRead">{entry}</div>
  )
}

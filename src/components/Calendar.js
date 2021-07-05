import React,{ useState, useEffect, Component } from 'react'
import axios from 'axios';
import Textfield from './Textfield.js';
import {API_URL} from './API_URL.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


class Calendar extends Component {

  constructor(){
    super();
    let month = ""
    let monthName = ""
    let daysInMonth = 0
    this.state = {
      year: "",
      month: month,
      monthName: monthName,
      daysInMonth: 0,
      readingDay: 0
    }
    this.mL =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.mS =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  }

  getDaysInMonth = (year,m) => {
      var days = new Date(year, m+1, 0).getDate()
      var cal = []
      for (var i = 0; i < days; i++) {
          cal.push(i);
      }
      return cal;
  }


  componentWillMount(){

    var d = new Date()
    let year = d.getFullYear();
    let month  = d.getMonth();

    var days = this.getDaysInMonth(year,month)

    this.setState((state) => {
      return {
          year: year,
          month: month,
          monthName: this.mL[month],
          daysInMonth: days
      }
    })
  }

  goBack(){
    var a=1;
    var d = new Date()
    let year = this.state.year;
    let month  = this.state.month-1;
    if (month<0) {
      year -=1;
      month=11;
    }
    var days = this.getDaysInMonth(year,month)
    this.setState((state) => {
      return {
          year: year,
          month: month,
          monthName: this.mL[month],
          daysInMonth: days
      }
    })
  }


  goForward(){
    var a=1;
    var d = new Date()
    let year = this.state.year;
    let month  = this.state.month+1;
    var days = this.getDaysInMonth(year,month)
    if (month>11) {
      year +=1;
      month=0;
    }
    this.setState((state) => {
      return {
          year: year,
          month: month,
          monthName: this.mL[month],
          daysInMonth: days
      }
    })
  }
  dayClicked(e){

  }
  render() {
    return (
      <Router>
        <div className="calendarWrapper">
          { this.state.readingDay==0 ?
            <>
              <span className="year">{this.state.year}</span><br />
              <div className="heading">
                <span className="arrows" onClick={() => (this.goBack())}>&larr;</span>
                <span className="monthName">{this.state.monthName}</span>
                <span className="arrows" onClick={() => (this.goForward())}>&rarr;</span>
              </div>

              <div className="days ">
                {
                  this.state.daysInMonth.map((index, elem) => {
                      return <Link onClick={() => this.setState(({readingDay:elem+1}))}to={"/"+this.state.year+"/"+(this.state.month+1)+"/"+(elem+1)} key={index}>
                        <div className="calendarDay">
                        <div className="dayClick">{elem+1}</div>
                        <ul className="calendarActivities">
                          <li>eat lunch</li>
                        </ul>
                      </div></Link>
                  })
                }

              </div>
            </>
              :
              <>
                <Switch>
                  <Route path="/:year/:month/:day" children={<Day  onBackClick={() => this.setState(({readingDay:0}))} />}></Route>
                </Switch>
              </>
          }
        </div>
      </Router>
    )
  }
}

const Day = ({onBackClick}) => {
  let { day } = useParams();
  let { month } = useParams();
  let { year } = useParams();

  const[memories,setMemories] = useState([[],[],[],[]]);
  const[eventsToday,setEventsToday] = useState([]);

  useEffect(()=>{
    axios.post(API_URL,{memoryDayInfo: day+","+month+","+year})
    .then(res => {
        setMemories(res.data); // books, events, entries, notes
        console.log(res.data);
      })
    axios.post(API_URL,{dayInfo: day+","+month+","+year})
      .then(res => {
          setEventsToday(res.data);
          console.log(res.data);
        })
  },[])
  if (onBackClick===undefined) {
    onBackClick = function(){
      window.location = "/#Calendar";
    }
  }
  function addEvent(e){
    var v = document.getElementById("addTaskDay").value;
    var time = document.getElementById("eventDate").value;
    axios.post(API_URL,{addEvent:v,time:time})
      .then(res => {
          console.log(res.data);
        })
  }

  return (
    <div className="dayWrap">
         <input type="button" value="←" onClick={onBackClick} className="backCalendar" /> <br />
         <Textfield placeholder="Add Task" Id="addTaskDay"/>
         <br />
         <input type="time" id="eventDate" />
         <br />
         <input type="button" value="+" className="addTask" onClick={addEvent}/>
         <br />
        {
          memories[0].length+memories[1].length+memories[2].length+memories[3].length>0 &&
          <div className="memories">
            <span className="yearsAgo">Today in</span>
            <ul className="memoryList">
              {
                memories.map((item, index) => {
                  if (index==0) {
                    return item.map((item2, i) => {
                      return <li key={i}>{item2[1].substr(0,4)+" you added "+item2[0]+" to your reading list."}</li>
                    });
                  }else if(index==1){
                    return item.map((item2, i) => {
                      return <li key={i}>{item2[1].substr(0,4)+" you added "+item2[0]+" to your event list."}</li>
                    });
                  }else if(index==2){
                    return item.map((item2, i) => {
                      return <li key={i}>{item2[1].substr(0,4)+" you wrote entry id="+item2[0]}</li>
                    });
                  }else if(index==3){
                    return item.map((item2, i) => {
                      return <li key={i}>{item2[1].substr(0,4)+" you added '"+item2[0]+"' to your notes"}</li>
                    });
                  }
                })
              }
            </ul>
          </div>
        }
        <div className="eventsToday">
            <span>Events</span>
            <ul className="eventsTodayList">
              {
                eventsToday.map((item, index) => {
                  return <li key={index}>{item[1]+" "+item[0]}</li>
                })
              }
            </ul>
        </div>
    </div>
  )
}
export default Calendar
export {Day}

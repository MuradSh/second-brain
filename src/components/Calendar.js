import React, { Component } from 'react'
import {API_URL} from './API_URL.js';


export default class Sidebar extends Component {

  constructor(){
    super();
    let month = ""
    let monthName = ""
    let daysInMonth = 0
    this.state = {
      month: month,
      monthName: monthName,
      daysInMonth: 0
    }
  }

  componentWillMount(){
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var getDaysInMonth = function(year,m){
        var days = new Date(year, m, 0).getDate()
        var cal = []
        for (var i = 0; i < days; i++) {
            cal.push(i);
        }
        return cal;
    }

    var d = new Date()
    let year = d.getFullYear();
    let month  = d.getMonth();

    var days = getDaysInMonth(year,month)

    this.setState((state) => {
      return {
          month: month,
          monthName: mL[month],
          daysInMonth: days
      }
    })
  }


  render() {
    return (
      <div className="calendarWrapper">
          <div className="heading">
            <span className="arrows">&larr;</span>
            <span className="monthName">{this.state.monthName}</span>
            <span className="arrows">&rarr;</span>
          </div>
          <div className="days ">
            {
              this.state.daysInMonth.map((index, elem) => {
                  return <span className="calendarDay" key={index}>{elem}</span>
              })
            }
          </div>
      </div>
    )
  }
}

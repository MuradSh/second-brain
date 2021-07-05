import React, { Component } from 'react'
import ToDo from './ToDo.js'
import Notes from './Notes.js'
import Journal from './Journal.js'
import Books from './Books.js'
import Calendar from './Calendar.js'
import {Day} from './Calendar.js'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const Wrapper = ({page}) => {
  return (
    <div className="wrapper">
        <Switch>
          <Route path="/:year/:month/:day" children={<Day />}></Route>
          <Route path="/" children={<Wrapped page={page}/>}></Route>
        </Switch>
    </div>
  )
}


const Wrapped = ({page}) => {

  function renderSwitch(){
      if(window.location.hash!=""){
        page = window.location.hash.substr(1).replace("%20"," ")
      }
      switch (page) {
        case 'To Do':
          return <ToDo />
          break;
        case 'Notes':
          return <Notes />
          break;
        case 'Journal':
          return <Journal />
          break;
        case 'Books':
          return <Books />
          break;
        case 'Calendar':
          return <Calendar />
          break;
        default:
          return <h1>not found</h1>
          break;
      }
  }

  return renderSwitch()
}

export default Wrapper

import React,{ useState, useEffect } from 'react'
import ToDo from './ToDo.js'
import Notes,{ ShowNote } from './Notes.js'
import Journal from './Journal.js'
import Books from './Books.js'
import Calendar from './Calendar.js'
import Movies from './Movies.js'
import {Day} from './Calendar.js'
import Login from './Login.js'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import config from '../config.js'

const LOGIN_PASS = config.PASSWORD

const Wrapper = ({page}) => {
  return (
    <div className="wrapper">
        <Switch>
          <Route path="/:year/:month/:day" children={<Day />}></Route>
          <Route path="/home" children={<Wrapped page={page}/>}></Route>
          <Route path="/note/:id" children={<ShowNote  onclick={() => {window.location = "/home#Notes"}} />}></Route>
          <Route path="/" children={<Login />}></Route>
        </Switch>
    </div>
  )
}


const Wrapped = ({page}) => {

  useEffect(() => {
      // check if user has access
      var c = JSON.parse(window.localStorage.getItem("pass"));
      let now =  new Date()
      if (LOGIN_PASS!=c.pass || now.getTime()> c.expiryDate) {
         window.location = "/"
      }
  },[]);

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
        case 'Movies':
          return <Movies />
          break;
        default:
          return <h1>not found</h1>
          break;
      }
  }

  return renderSwitch()
}

export default Wrapper

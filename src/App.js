import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Wrapper from './components/Wrapper.js';
import {Day} from './components/Calendar.js';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import config from './config.js'

const LOGIN_PASS = config.PASSWORD

// TODO: improve login security(database API)
// TODO: ability to hide
// TODO: improve todo and completed


function App() {

  const [page,setPage] = useState("To Do")

  function changePage(pageName){

    var c = JSON.parse(window.localStorage.getItem("pass"));
    if (LOGIN_PASS!=c.pass) {
      window.location = "/"
    }else{
      window.location = "/home#"+pageName
      // window.location.hash = pageName
      setPage(pageName);
    }
  }

  return (
    <Router>
      <div className="App">
        <Sidebar page={page} onChange={changePage}/>
        <Wrapper page={page}/>
      </div>
    </Router>
  );
}

export default App;

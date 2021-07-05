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

// TODO: onclick note show comments
// TODO: ability to hide
// TODO: improve todo and completed
// TODO: add comment on note click on notes page
// TODO: fix calendar url not swithcing


function App() {

  const [page,setPage] = useState("To Do")

  function changePage(pageName){
    window.location = "/#"+pageName
    // window.location.hash = pageName
    setPage(pageName);
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

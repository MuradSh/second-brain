import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Wrapper from './components/Wrapper.js';
import React, { useState } from 'react';

// TODO: onclick note show comments
// TODO: ability to hide
// TODO:improve todo and completed

function App() {

  const [page,setPage] = useState("To Do")

  function changePage(pageName){
    window.location.hash = pageName
    setPage(pageName);
  }

  return (
    <div className="App">
      <Sidebar page={page} onChange={changePage}/>
      <Wrapper page={page}/>
    </div>
  );
}

export default App;

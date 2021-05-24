import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Wrapper from './components/Wrapper.js';
import React, { useState } from 'react';

function App() {

  const [page,setPage] = useState("To Do")

  function changePage(pageName){
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

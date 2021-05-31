import React, { Component } from 'react'
import ToDo from './ToDo.js'
import Notes from './Notes.js'
import Journal from './Journal.js'
import axios from 'axios'

const Wrapper = ({page}) => {


  function renderSwitch(){
      if(window.location.hash!=""){
        page = window.location.hash.substr(1)
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
          return <h1>a</h1>
          break;
        default:
          return <h1>not found</h1>
          break;
      }
  }

  return (
    <div className="wrapper">
    {renderSwitch()}
  </div>
  )
}

export default Wrapper

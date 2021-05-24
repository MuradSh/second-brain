import React, { Component } from 'react'
import ToDo from './ToDo.js'

const Wrapper = ({page}) => {

  function renderSwitch(){
      switch (page) {
        case 'To Do':
          return <ToDo />
          break;
        case 'Journal':
          return <h1>sakz</h1>
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
    <>
    {renderSwitch()}
    </>
  )
}

export default Wrapper

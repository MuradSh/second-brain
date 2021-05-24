import React, { Component } from 'react'

export default class Sidebar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sideBarElements: ["To Do","Notes","Journal","Books","Calendar","Movies"]
    }
  }

  render() {
    return (
      <div className="sideBar">
        {
          this.state.sideBarElements.map((value,index)=>{
            return <div onClick={() => this.props.onChange(value)} className="sideBarElement" key={value}>{value}</div>
          })
        }
      </div>
    )
  }
}

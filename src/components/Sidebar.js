import React, { Component } from 'react'

export default class Sidebar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sideBarElements: ["To Do","Notes","Journal","Books","Calendar","Movies"]
    }
  }

  highlight(e){ //highlight the clicked elemnt with a class name
      var prevSelected = document.getElementsByClassName("selectedSideBar")[0]
      if(prevSelected!=null){
        prevSelected.classList.remove("selectedSideBar");
      }
      e.target.classList.add("selectedSideBar");
      // console.log(document.getElementsByClassName("selectedSideBar")[0].classList)
  }

  render() {
    return (
      <div className="sideBar">
        {
          this.state.sideBarElements.map((value,index)=>{
            return <div onClick={e => {this.props.onChange(value); this.highlight(e)}} className="sideBarElement" key={value}>{value}</div>
          })
        }
      </div>
    )
  }
}

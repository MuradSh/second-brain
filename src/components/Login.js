import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Textfield from './Textfield.js';
import Icon from '@material-ui/core/Icon';
import config from '../config.js'

const LOGIN_PASS = config.PASSWORD

const Login = () => {

  // if already logged in , then redirect
  useEffect(() => {
      // check if user has access
      var c = JSON.parse(window.localStorage.getItem("pass"));
      let now =  new Date()
      if (LOGIN_PASS==c.pass && now.getTime()<c.expiryDate) {
         window.location = "/home"
      }
  },[]);

  function passCheck(e){
    if(e.keyCode==13){
      if(e.target.value==LOGIN_PASS){
        let now = new Date()
        const passItem = {
          pass: e.target.value,
          expiryDate: now.getTime()+21600000, // 6 hours in milliseconds
        }
        var k = window.localStorage.setItem("pass",JSON.stringify(passItem))
        window.location = "/home"
      }else{
        alert("WRONG!")
      }
    }
  }


  return (
    <div className="loginWrap">
      <Textfield placeholder="Password" type="password" onKeyDown={passCheck} id="addNote" />
      <Icon style={{ color: "#555" }}>lock</Icon>
    </div>
  )
}

export default Login

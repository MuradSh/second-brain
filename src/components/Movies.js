import React,{ useState, useEffect } from 'react'
import Option from './Option.js';
import Textfield from './Textfield.js';
import Icon from '@material-ui/core/Icon';
import config from '../config.js'
import {API_URL} from './API_URL.js';
import axios from 'axios'

const MOVIE_TOKEN = config.MOVIE_TOKEN

// SEARCH MOVIES WITH API and With that


const Movies = () => {
  const [pageToShow,setPageToShow] = useState("To Watch")
  const [searchHome,setSearchHome] = useState(true)
  const [internetResults,setInternetResults] = useState([])

  function searchNet(e){

    if(e.keyCode==13){

        let infoURL = "https://api.themoviedb.org/3/search/movie?api_key=7091975667bd8b4f12fbec5e138e4f3f&language=en-US&query=Once%20upon%20a%20time%20in%20hollywood&page=1&include_adult=false"
        let posterBaseURL = "https://image.tmdb.org/t/p/w400/"
        axios.get(infoURL)
        .then(res => {
            setInternetResults(res.data["results"])
          })
    }
    //https://api.themoviedb.org/3/search/movie?api_key=7091975667bd8b4f12fbec5e138e4f3f&language=en-US&page=1
  }
  return (
    <div>
      <span className="moviesHead">Movies to Watch</span><br />
      <Option changePage={()=> {setPageToShow("To Watch");}} showing={pageToShow} text="To Watch"/>
      <Option changePage={()=> {setPageToShow("Watched");}}  showing={pageToShow} text="Watched" /><br />
      {
        searchHome
        ?
        <Textfield placeholder="Search Movies" id="searchMovieHome" />
        :
        <Textfield placeholder="Search Movie in the Internet" onKeyDown={searchNet} id="searchMovieInternet" />
      }
      <div className="worldIcon" onClick={() => {setSearchHome(!searchHome)}}>
          <Icon style={{ color: "#555" }}>{searchHome ? "publicIcon" : "home" }</Icon>
      </div>
      <br />
      {
        internetResults.map((value,index) => {
          return <><span>{value["title"]}</span><br /></>
        })
      }
    </div>
  )
}

export default Movies

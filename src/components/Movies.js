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
  const [moviesToWatch,setMoviesToWatch] = useState([])
  const [moviesWatched,setMoviesWatched] = useState([])

  function searchNet(e){

    if(e.keyCode==13){
        let searchfor = e.target.value;
        let infoURL = "https://api.themoviedb.org/3/search/movie?api_key=7091975667bd8b4f12fbec5e138e4f3f&language=en-US&query="+searchfor+"&page=1&include_adult=false"
        let posterBaseURL = "https://image.tmdb.org/t/p/w400"
        axios.get(infoURL)
        .then(res => {
            let results = res.data["results"]
            setInternetResults(results)
          })
    }
    //
    //https://api.themoviedb.org/3/search/movie?api_key=7091975667bd8b4f12fbec5e138e4f3f&language=en-US&page=1
  }

  function movieClicked(movieInfo){
    axios.post(API_URL,{addMovie: movieInfo})
    .then(res => {
        console.log(res.data)
      })
  }

  function addToWatched(id){
    axios.post(API_URL,{addMovieToWatched: id})
    .then(res => {
        console.log(res.data)
      })
  }

  useEffect(() => {
    axios.post(API_URL,{getMovies: ""})
    .then(res => {
        setMoviesToWatch(res.data)
      })
      axios.post(API_URL,{getMoviesWatched: ""})
      .then(res => {
          setMoviesWatched(res.data)
        })
  },[]);

  return (
    <div>
      <span className="moviesHead">Movies to Watch</span><br />
      <Option changePage={()=> {setPageToShow("To Watch");}} showing={pageToShow} text="To Watch"/>
      <Option changePage={()=> {setPageToShow("Watched");}}  showing={pageToShow} text="Watched" /><br />
      <Textfield placeholder="Search Movie in the Internet" onKeyDown={searchNet} id="searchMovieInternet" />
      <br />
      {
        internetResults.length==0
        ?
          pageToShow=="To Watch"
          ?
          moviesToWatch.map((value,index) => {
            return <div key={index} className="moviesToWatch" onClick={() => addToWatched(value[2])}>
              <img src={"https://image.tmdb.org/t/p/w300/"+value[1]}/><br />
              <span>{value[0]}</span>
            </div>
          })
          :
          moviesWatched.map((value,index) => {
            return <div key={index} className="moviesToWatch">
              <img src={"https://image.tmdb.org/t/p/w300/"+value[1]}/><br />
              <span>{value[0]}</span>
            </div>
          })
        :
        internetResults.map((value,index) => {
          if (value["poster_path"]!=undefined) {
          return <div className="movieSearchResults" key={index} onClick={() => movieClicked(value)}>
            <img src={"https://image.tmdb.org/t/p/w300/"+value["poster_path"]}/>
            <br />
            <span className="movieName">{value["title"]}</span>
            <br />
            <span className="movieRating">{value["vote_average"]}</span>
            <Icon className="starIcon" style={{ color: "#555" }}>star</Icon>
          </div>
          }
        })
      }
    </div>
  )
}

export default Movies

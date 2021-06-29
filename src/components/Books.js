import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Textfield from './Textfield.js';
import Option from './Option.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import {API_URL} from './API_URL.js';

const Books = () => {

  const [pageToShow,setPageToShow] = useState("Books")
  const [showBooks,setShowBooks] = useState(true) // show books or add books
  const [showCollection,setShowCollection] = useState(true) // show collection or add collection
  const [collections,setCollections] = useState([]);
  const [books,setBooks] = useState([]);
  const [collectionOpen,setCollectionOpen] = useState(0); //on click collection

  const [newCol,setNewCol] = useState(false); // on add book, add a new collection

  const classNames = ['pinkHover','blueHover','yellowHover']  //collection hover colors

  function addCollection(){
    var name = document.getElementById("collectionName").value;
    axios.post(API_URL,{addCollection: name})
    .then(res => {
        console.log(res)
      })
  }

  function addBook(){
    var name = document.getElementById("bookName").value;
    var author = document.getElementById("bookAuthor").value;
    var collectionId = document.getElementById("selectCollection").options[document.getElementById("selectCollection").selectedIndex].getAttribute("alpha-id");
    var newCollection = "";
    if(newCol && document.getElementById("newCollectionName").value.length>0){
      newCollection = document.getElementById("newCollectionName").value;
    }

    axios.post(API_URL,{addBook: [name,author,collectionId,newCollection]})
    .then(res => {
        alert(res.data);
      })
  }

  useEffect(() => {
    axios.post(API_URL,{getBooks: ""})
    .then(res => {
          setBooks(res.data[0]);
          setCollections(res.data[1]);
      })
  },[])

  return (
    <Router>
      <div className="booksWrapper">
        <Option changePage={()=> {setPageToShow("Books");setCollectionOpen(0)}} showing={pageToShow} text="Books"/>
        <Option changePage={()=> {setPageToShow("Collections");setCollectionOpen(0)}}  showing={pageToShow} text="Collections" />
        { collectionOpen==0 ?
        <div>
            { pageToShow=="Books" ?
                  <div className="toReadBooks">
                    <input type="button" value={(showBooks ? "+" : "←")} onClick={()=> {setShowBooks(!showBooks)}} className="changeJournalPage" />
                    <br />
                    {
                      showBooks ?

                        Object.keys(books).map((value, index) => {
                          let book = books[value];
                          return <div key={index} className="book">
                            <span>{book[1]} by {book[2]}</span>
                            <br />
                            <span className="collectionNames">{book[5]}</span>
                          </div>
                        })
                        :
                        <div className="addBook">
                          <Textfield placeholder="Book Name" Id="bookName" />
                          <Textfield placeholder="Author" Id="bookAuthor" />
                          <br />
                          <select id="selectCollection">
                              <option alpha-id="0">Select Collection</option>
                              {
                                Object.keys(collections).map((value, index) => {
                                  let collection = collections[value];
                                  return <option key={index} alpha-id={collection["id"]}>{collection["name"]}</option>
                                })
                              }
                          </select>
                          <br />
                          {newCol && <><Textfield placeholder="Collection Name" Id="newCollectionName" /><br /></>}
                          <input type="button" value={!newCol ? "New Collection" : "Remove"} onClick={() => {setNewCol(!newCol)}} className="newColBookButton" />
                          <br />
                          <input type="button" value="Submit" onClick={addBook} className="addBookButton" />
                        </div>
                    }

                  </div>
                  :
                  <>
                    <br/>
                    <input type="button" value={(showCollection ? "+" : "←")} onClick={()=> {setShowCollection(!showCollection)}} className="changeJournalPage" />
                      { showCollection ?
                        <div className="shelves">
                          <br/>
                          {
                              Object.keys(collections).map((value, index) => {
                                let collection = collections[value];
                                return <Link key={index} to={collections[value]["name"]}><div onClick={() => (setCollectionOpen(collections[value]["id"]))} className={"collection "+ classNames[Math.floor(Math.random() * classNames.length)]}>
                                  <span>{collections[value]["name"]}</span>
                                </div></Link>
                              })
                          }
                        </div>
                          :
                          <div className="addCollection">
                            <Textfield placeholder="Collection Name" Id="collectionName" />
                            <br/>
                            <input type="button" value="Submit" onClick={addCollection} className="addCollectionButton" />
                          </div>
                      }
                    </>
                }
            </div>
              :
          <Switch>
            <Route path="/:id" children={<Col colId={collectionOpen}/>}></Route>
          </Switch>
          }
      </div>
    </Router>
  )
}

const Col = ({ colId}) => {

  const [booksInCol, setBookInCol] = useState([])

  useEffect(() => {
        axios.post(API_URL,{getColBooks: colId}) //get collection books
        .then(res => {
            // console.log(res.data)
            setBookInCol(Object.values(Object.assign([], res.data)))
            if(res.data.length==0) setBookInCol("Nothing to show here")
          })
  },[]);

  return (
    <>
      <br />
      { booksInCol=="Nothing to show here" ?
        booksInCol
        :
        booksInCol.map((item, index) => {
          return <div className="collectionBooks">{item}</div>
        })
      }
    </>
  )
}

export default Books

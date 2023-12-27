import "./styles.css";
import Note from "./components/Note";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
//import notes from "./note";
import CreateArea from "./components/CreateArea"
import {useEffect, useState} from "react";
import axios from "axios";


export default function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote){
    setNotes(prevNotes=>{
     return [...prevNotes, newNote]
    });
  }

  function deleteItem(id) {
    axios.post("http://localhost:4000/api/delete", { id: id })
      .then(res => {
        setNotes(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() =>{
    axios.get("http://localhost:4000/api/getAll")
    .then(res => setNotes(res.data))
  },
  [])

  return (
  <div>
    <Header />
    <CreateArea onAdd={addNote}/>
    {notes.map((noteItem )=>{
      return <Note 
      key={noteItem._id}
      id={noteItem._id}
      title = {noteItem.title} 
       content={noteItem.content} 
        onDelete={deleteItem}
      />
    })}
    <Footer />
  </div>
  );
}


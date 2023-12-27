import  {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const [expand, SetExpand] = useState(false);

    function handleChange(event){
        const {name, value}  = event.target;
        setNote(prevNote =>{
            return {
                ...prevNote,
                [name]:value
            };
          });
    }

    const submit = async (event) =>{
      event.preventDefault();
      props.onAdd(note);
      setNote({
        title:"",
        content:""
       });
      try {
        await axios.post("http://localhost:4000/api/addNew", note  )
         .then(res => console.log(res))
      } catch (error) {
        console.log(error);
      }
    }

    function extend(){
      SetExpand(true)
    }

    return (
      <div>
        <form className="create-note" >
        {
            expand?<input
             name="title" 
             placeholder="Title" 
             onChange={handleChange} 
             value={note.title}     
             />:null
        }
        
        <textarea name="content" 
            placeholder="Take a note..." 
            rows={expand? 3 : 1} 
            onChange={handleChange}  
            value={note.content}
            onClick={extend}    
            />
          
            <Zoom in={expand}>
          <Fab onClick={submit} ><AddIcon /></Fab></Zoom>
        </form>
      </div>
    );
  }
  
  export default CreateArea;
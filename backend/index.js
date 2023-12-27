import express from "express";
import cors from "cors";
import mongoose from "mongoose";
 
const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost:27017/myKeeperAppDB");

const keeperSchema = mongoose.Schema({
    title: String,
    content: String
});

const Keeper = new mongoose.model("Keeper", keeperSchema)

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.send("backend connected successfully");
});

app.get("/api/getAll", async(req,res) =>{
    try {
        const notes = await Keeper.find({});
        res.status(200).send(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
})

app.post("/api/addNew", async (req, res) => {
    try {
       const { title, content } = req.body;
       const KeeperObj = new Keeper({
          title,
          content
       });
       console.log(KeeperObj);
       await KeeperObj.save();
       const notes = await Keeper.find({});
       res.status(200).send(notes);
    } catch (error) {
       console.error(error);
       res.status(500).send("Internal Server Error");
    }
 });
 
app.post("/api/delete", async(req,res) =>{
    try {
        const {id} = await req.body;
        await Keeper.deleteOne({ _id: id});
        const notes = await Keeper.find({});
        res.status(200).send(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
});


app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})
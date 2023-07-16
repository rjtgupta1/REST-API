import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import contact from './db/dbconnect.js'
import student from './db/dbconnect.js';

const app = express()
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

try {
  mongoose.connect(DB_URL);
  console.log("Sucessfully connected to the database");
} catch (error) {
  console.error(error);
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const students = await student.find()
  res.send(students)
});
app.post("/", (req, res) => {
  console.log(req.body, "Body");
  console.log(req.query, "Query");
  console.log(req.params, "Params");
  const studentInfo = contact({
    name:req.body.name,
    age:req.body.age,
    Address:req.body.Address
  })
  try {
    studentInfo.save()
    res.send({message:'data saved'})
  } catch (error) {
    console.error(error)
  }
  
});
app.put('/',(req,res)=>{
  student.updateOne({name:req.body.name},{
    name:req.body.name,
    age:req.body.age,
    Address:req.body.Address
  }).then( res.send('Data Updated') )
  .catch((err)=>{ console.log(err) })
})
app.delete('/',(req,res)=>{
  student.deleteOne({name : req.body.name})
  .then( res.send('deleted the data'))
  .catch((err)=>{
    console.error(err)
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

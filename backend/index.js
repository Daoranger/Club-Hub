import express from "express"
import mysql from "mysql2"

const app = express()

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"03112004",
  database:"test"
})

app.get("/", (req,res)=> {
  res.json("Hello this is the backend")
})

app.get("/books", (req,res)=>{
  const q = "SELECT * FROM books"
  db.query(q, (err,data)=> {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/books", (req,res)=> {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
  const values = ["title from back", "desc from backend", "cover pic from backend"]
  
  db.query(q,[values], (err,data)=>{
    if(err) return res.json(err)
    return res.json("Book has been created sucessfully")
  })
})

app.listen(8800, ()=>{
  console.log("Connected to backend!1")
})
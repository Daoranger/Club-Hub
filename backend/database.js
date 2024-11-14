import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

// App configurationc
const app = express();
dotenv.config();

// DB connection; make sure to set up .env variables
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// Backend connection
app.get("/", (req,res)=> {
  res.json("Hello! You are connected to backend!");
});

// Start the server at localhost:8800
app.listen(8800, ()=>{
  console.log("Connected to backend!");
});
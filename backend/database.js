import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

// Required modules
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

// App configuration
const app = express();
dotenv.config();
app.use(cors());

// DB connection; make sure to set up .env variables
const dbCon = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Testing DB connection
dbCon.connect(function(err) {
  if(err) {
    console.log("DB Connection error!");
  } else {
    console.log("DB Connection is good!");
  }
});

// Backend connection
app.get("/", (req,res)=> {
  res.json("Hello! You are connected to backend!");
});

app.get("/login", (req,res)=> {
  dbCon.query("SELECT * FROM users", (err, result)=> {
    if(err) {
      console.log("Error in fetching users!");
    } else {
      res.json(result);
    }
  });
});

app.get("/signup", (req,res)=> {
  const username = req.query.username;
  const email = req.query.email;
  const password = req.query.password;
  dbCon.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, email, password], (err, result)=> {
    if(err) {
      console.log("Error in fetching users!");
    } else {
      res.json(result);
    }
  });
});

// Start the backend server at localhost:8800
app.listen(8800, ()=>{
  console.log("Connected to backend!");
});
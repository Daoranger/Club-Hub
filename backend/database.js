import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// App configuration
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

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
  dbCon.query("SELECT * FROM users", (err, result)=> {
    if(err) {
      console.log("Error in fetching users!");
      console.log(err)
    } else {
      res.json(result);
    }
  });
  dbCon.query("SELECT * FROM messages", (err, result)=> {
    if(err) {
      console.log("Error in fetching messages!");
      console.log(err)
    } else {
      res.json(result);
    }
  });
});

app.post("/login", (req,res)=> {
  
});

app.post("/signup", (req,res)=> {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  check_password_validity(password);

  const hashedPassword = bcrypt.hashSync(password, 10);

  dbCon.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], (err, result)=> {
    if(err) {
      check_err_code(err);
    } else {
      res.send({username: username});
    }
  });
});

app.get("/messages", (req,res)=> {
  dbCon.query("SELECT message FROM messages ORDER BY id ASC", (err, result)=> {
    if(err) {
      check_err_code(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/messages", (req,res)=> {
  const message = req.body.message;
  dbCon.query("INSERT INTO messages (message) VALUES (?)", [message], (err, result)=> {
    if(err) {
      console.log("Error in inserting message!");
      console.log(err)
    } else {
      res.send({message: message});
    }
  });
});

function check_password(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function check_password_validity(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$?-])[A-Za-z\d!@#$?-]{8,24}$/;
  if (!password.match(regex)) {
    res.status(400).json({
      errors:[{
          msg: "Password must be 8-24 characters long and contain at least one letter, one number, and one special character."
        }]
    });
  } else {
    return true;
  }
}

function check_err_code(err) {
  if (err.code === "ER_DUP_ENTRY") {
    res.status(400).json({
      errors:[{
          msg: "Username or email already exists."
        }]
    });
  }
  // Add more error codes as needed
}

// Start the backend server at localhost:8800
app.listen(8800, ()=>{
  console.log("Connected to backend!");
}); 
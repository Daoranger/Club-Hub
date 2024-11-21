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
  const sql = `
    SELECT 
      m1.id, m1.message, m1.reply_to, m1.timestamp, 
      m2.message AS replied_message 
    FROM messages m1
    LEFT JOIN messages m2 ON m1.reply_to = m2.id
    ORDER BY m1.timestamp ASC;
  `;
  dbCon.query(sql, (err, result)=> {
    if(err) {
      check_err_code(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/messages", (req,res)=> {
  const { message, reply_to } = req.body;
  const sql = "INSERT INTO messages (message, reply_to) VALUES (?, ?)";
  dbCon.query(sql, [message, reply_to || null], (err, result)=> {
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
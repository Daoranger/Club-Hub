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
  dbCon.query("SELECT * FROM User", (err, result)=> {
    if(err) {
      console.log("Error in fetching users!");
      console.log(err)
    } else {
      res.json(result);
    }
  });
});

app.get("/clubs", (req, res) => {
  dbCon.query(`SELECT * FROM clubs`, (err, result) => {
    if (err){
      console.log(err);
    } else {
      res.json(result);
    }
  })
})

app.get("/messages", (req, res)=> {
  const sql = `
    SELECT 
      m1.MID AS message_id,
      u1.username AS sender_username,
      m1.message,
      m1.reply_to,
      m1.timestamp,
      m2.message AS replied_message,
      u2.username AS replied_user
    FROM Message m1
    LEFT JOIN Message m2 ON m1.reply_to = m2.MID
    LEFT JOIN User u1 ON m1.UID = u1.UID
    LEFT JOIN User u2 ON m2.UID = u2.UID
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

app.post("/login", (req,res)=> {
  const username = req.body.username;
  const password = req.body.password;

  dbCon.query("SELECT username FROM users WHERE username = ? AND password = ?", [username, password], (err, result)=> {
    if (err) {
      console.log(err)
    } else {
      if (result.length === 0) {
        res.status(400).json({
          errors:[{
              msg: "Username/password is incorrect."
            }]
        });
      } else {
        res.send({username: username});
      }
    }
  });
});


app.post("/signup", (req,res)=> {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // check_password_validity(password);

  // const hashedPassword = bcrypt.hashSync(password, 10);

  dbCon.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result)=> {
    if(err) {
      check_err_code(err);
    } else {
      res.send({username: username});
    }
  });
});

app.post("/messages", (req,res)=> {
  const { username, message, reply_to } = req.body;
  const sql = "INSERT INTO messages (username, message, reply_to) VALUES (?, ?, ?)";
  dbCon.query(sql, [username, message, reply_to || null], (err, result)=> {
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

// POST: Store Thread Info into DB
app.post("/create-thread", (req, res) => {
  const { threadTitle, threadContent, category } = req.body;

  const sql = `INSERT INTO threads (title, content, category) VALUES (?, ?, ?)`;
  
  dbCon.query(sql, [threadTitle, threadContent, category], (err, result) => {
    if (err) {
      console.log("Error creating thread:", err);
      res.status(500).json({ message: "Failed to create thread" });
    } else {
      res.status(201).json({ message: "Thread created successfully", threadId: result.insertId });
    }
  });
});

// GET: Get the Threads Info in DB to display in ThreadPage
app.get("/thread", (req, res) => {
  const sql = "SELECT * FROM threads"; // Assuming you have a 'threads' table
  dbCon.query(sql, (err, result) => {
    if (err) {
      console.log("Error fetching threads:", err);
      res.status(500).json({ message: "Failed to fetch threads" });
    } else {
      res.json(result); // Send the threads data back to the frontend
    }
  });
});


// Start the backend server at localhost:8800
app.listen(8800, ()=>{
  console.log("Connected to backend!");
}); 
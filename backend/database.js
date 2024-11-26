import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

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
app.get("/", (req, res)=> {
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
  const { userID } = req.query;

  const query = `
    SELECT C.*
    FROM Club C
    JOIN ClubProfile CP ON C.CID = CP.CID
    WHERE CP.UID = ?;
  `;

  dbCon.query(query, [userID], (err, result) => {
    if (err){
      console.log(err);
    } else {
      res.json(result);
    }
  })
})

app.post("/create-club", (req, res) => {
  const { userID, name, description } = req.body;

  const query = `
    INSERT INTO Club (name, description) VALUES (?, ?);
  `;

  dbCon.query(query, [name, description], (err, result1) => {
    if (err) {
      check_err_code(err, res);
    } else {
      const CID = result1.insertId;
      const query2 = `
        INSERT INTO Role (CID, name) VALUES (?, ?);
      `;
      dbCon.query(query2, [CID, "Owner"], (err, result2) => {
        if (err) {
          check_err_code(err, res);
        } else {
          const RID = result2.insertId;
          const query3 = `
            INSERT INTO ClubProfile (UID, RID, CID) VALUES (?, ?, ?);
          `;

          dbCon.query(query3, [userID, RID, CID], (err, result3) => {
            if (err) {
              check_err_code(err, res);
            } else {
              res.send({ message: "Club created successfully!" });
            }
          });
        }
      });
    }
  });
});

app.post("/login", (req, res)=> {
  const { username, password } = req.body;

  dbCon.query("SELECT UID, password FROM User WHERE username = ?", [username], async (err, result)=> {
    if (err) {
      check_err_code(err, res);
    } else {
      if (result.length === 0) {
        res.status(400).json({
          errors:[{
              msg: "Username is incorrect."
            }]
        });
      } else {
        const match = await bcrypt.compare(password, result[0].password);

        if (match) {
          res.send({ username: username, userID: result[0].UID });
        } else {
          res.status(400).json({
            errors:[{
                msg: "Password is incorrect."
              }]
          });
        }
      }
    }
  });
});


app.post("/signup", (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    major,
    gradYear
  } = req.body;

  dbCon.query("INSERT INTO User (username, email, password, fname, lname, major, gradYear) VALUES (?, ?, ?, ?, ?, ?, ?)", [
      username,
      email,
      hashPassword(password),
      firstName,
      lastName,
      major,
      gradYear
    ], (err, result)=> {

    if(err) {
      check_err_code(err, res);
    } else {
      res.send({ message: "User created successfully!" });
    }
  });
});

app.post("/chatroom/:id", (req, res)=> {
  const { userID, message, reply_to } = req.body;

  const sql = "INSERT INTO Message (UID, message, reply_to) VALUES (?, ?, ?)";
  dbCon.query(sql, [userID, message, reply_to || null], (err, result)=> {
    if(err) {
      console.log("Error in inserting message!");
      console.log(err)
    } else {
      res.send({message: message});
    }
  });
});

app.get("/club=:CID/chatroom=:CRID", (req, res)=> {
  const { clubID } = req.params;

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
    WHERE m1.CRID = ?
    ORDER BY m1.MID;
  `;

  dbCon.query(sql, [clubID], (err, result) => {
    if (err) {
      check_err_code(err);
    } else {
      res.json(result);
    }
  });
  dbCon.query(sql, (err, result)=> {
    if(err) {
      check_err_code(err);
    } else {
      res.json(result);
    }
  });
});

// POST: Store Thread Info into DB
app.post("/create-thread/:id", (req, res) => {
  const { clubID } = req.params;
  const {
    threadTitle,
    threadContent,
    category
    } = req.body;

  const sql = `INSERT INTO Thread (title, content, category, CID) VALUES (?, ?, ?, ?)`;
  
  dbCon.query(sql, [threadTitle, threadContent, category, clubID], (err, result) => {
    if (err) {
      console.log("Error creating thread:", err);
      res.status(500).json({ message: "Failed to create thread" });
    } else {
      res.status(201).json({ message: "Thread created successfully", threadId: result.insertId });
    }
  });
});

// GET: Get the Threads Info in DB to display in ThreadPage
app.get("/thread/:id", (req, res) => {
  const { clubID } = req.params;

  const sql = `
  SELECT *
  FROM Thread t
  WHERE t.CID = ?
  ORDER BY t.TID;
  `; // Assuming you have a 'threads' table

  dbCon.query(sql, (err, result) => {
    if (err) {
      console.log("Error fetching threads:", err);
      res.status(500).json({ message: "Failed to fetch threads" });
    } else {
      res.json(result); // Send the threads data back to the frontend
    }
  });
});

function check_err_code(err, res) {
  if (err.code === "ER_DUP_ENTRY") {
    res.status(400).json({
      errors:[{
          msg: "Username or email already exists."
        }]
    });
  } else {
    res.status(500).json({
      errors:[{
          msg: err.sqlMessage
        }]
    });
  }
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// Start the backend server at localhost:8800
app.listen(8800, ()=>{
  console.log("Connected to backend!");
}); 
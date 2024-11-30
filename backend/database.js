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

app.get("/roles", (req, res) => {
  const { userID } = req.query;

  const query = `
    SELECT R.name
    FROM Role R
    JOIN ClubProfile CP ON R.RID = CP.RID
    WHERE CP.UID = ?;
  `;
  dbCon.query(query, [userID], (err, result) => {
    if (err) {
      check_err_code(err, res);
    } else {
      res.send(result)
    }
  });
});

function create_role(userID, clubID, roleName, res, message="Role created successfully!") {
  const query = `
    INSERT INTO Role (CID, name) VALUES (?, ?);
  `;
  dbCon.query(query, [clubID, roleName], (err, result) => {
    if (err) {
      check_err_code(err, res);
    } else {
      const RID = result.insertId;
      const query2 = `
        INSERT INTO ClubProfile (UID, RID, CID) VALUES (?, ?, ?);
      `;
      dbCon.query(query2, [userID, RID, clubID], (err, result) => {
        if (err) {
          check_err_code(err, res);
        } else {
          res.send({ message: message });
        }
      });
    }
  });
}

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
      check_err_code(err, res);
    } else {
      res.json(result);
    }
  })
})

app.get("/club", (req, res) => {
  const { CID } = req.query;

  const query = `
    SELECT *
    FROM Club C
    WHERE C.CID = ?;
  `;
  dbCon.query(query, [CID], (err, result) => {
    if (err) {
      check_err_code(err, res);
    } else {
      res.send(result);
    }
  });
});

app.post("/create-role", (req, res) => {
  const { userID, clubID, roleName } = req.body;

  create_role(userID, clubID, roleName, res);
});

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
      
      create_role(userID, CID, "Owner", res, "Club created successfully!");
    }
  });
});

app.post("/create-chatroom", (req, res) => {
  const { clubID, chatroomName } = req.body;

  // Ensure chatroomName and clubID are provided
  if (!clubID || !chatroomName) {
    return res.status(400).json({ message: "Club ID and chatroom name are required." });
  }

  // Insert chatroom into the database
  const query = `INSERT INTO ChatRoom (CID, name) VALUES (?, ?)`;
  dbCon.query(query, [clubID, chatroomName], (err, result) => {
    if (err) {
      console.error("Error creating chatroom:", err);
      res.status(500).json({ message: "Failed to create chatroom." });
    } else {
      res.status(201).json({ message: "Chatroom created successfully.", chatroomID: result.insertId });
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

app.get("/chatrooms", (req, res) => {
  const { CID } = req.query;

  const query = `
    SELECT *
    FROM ChatRoom
    WHERE CID = ?;
  `;
  dbCon.query(query, [CID], (err, result) => {
    if (err) {
      check_err_code(err, res);
    } else {
      res.send(result);
    }
  });
});

app.post("/chatroom", (req, res)=> {
  const { CRID, userID, message, reply_to } = req.body;

  const query = "INSERT INTO Message (CRID, reply_to, message, UID) VALUES (?, ?, ?, ?)";
  dbCon.query(query, [CRID, reply_to || null, message, userID], (err, result)=> {
    if(err) {
      check_err_code(err, res);
    } else {
      res.send({message: message});
    }
  });
});

app.get("/chatroom", (req, res)=> {
  const { CRID } = req.query;

  console.log(CRID)

  const query = `
    SELECT 
      m1.MID AS message_id,
      u1.username AS username,
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

  dbCon.query(query, [CRID], (err, result) => {
    if (err) {
      check_err_code(err);
    } else {
      res.send(result);
    }
  });
});

// POST: Store Thread Info into DB
app.post("/create-thread", (req, res) => {
  const {
    threadTitle,
    threadContent,
    category,
    clubID
  } = req.body;

  console.log("Received thread data:", { threadTitle, threadContent, category, clubID });

  const sql = `INSERT INTO Thread (title, content, category, CID) VALUES (?, ?, ?, ?)`;
  
  dbCon.query(sql, [threadTitle, threadContent, category, clubID], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      res.status(500).json({ 
        message: "Failed to create thread",
        error: err.message
      });
    } else {
      res.status(201).json({ message: "Thread created successfully", threadId: result.insertId });
    }
  });
});

// GET: Get the Threads Info for a specific club
app.get("/thread", (req, res) => {
  const { CID } = req.query;

  const sql = `
    SELECT *
    FROM Thread
    WHERE CID = ?
    ORDER BY TID DESC
  `;

  dbCon.query(sql, [CID], (err, result) => {
    if (err) {
      console.log("Error fetching threads:", err);
      res.status(500).json({ message: "Failed to fetch threads" });
    } else {
      res.json(result);
    }
  });
});

app.get("/threads", (req, res) => {
  const { CID } = req.query;

  const query = `
    SELECT TID, title
    FROM Thread
    WHERE CID = ?;
  `;
  dbCon.query(query, [CID], (err, result) => {
    if (err) {
      check_err_code(err, res);
    } else {
      res.send(result);
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

// New endpoint to get a single thread
app.get("/thread/:id", (req, res) => {
  const threadId = req.params.id;

  const sql = `
    SELECT *
    FROM Thread
    WHERE TID = ?
  `;

  dbCon.query(sql, [threadId], (err, result) => {
    if (err) {
      console.log("Error fetching thread:", err);
      res.status(500).json({ message: "Failed to fetch thread" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Thread not found" });
      } else {
        res.json(result[0]);
      }
    }
  });
});

// Add this new endpoint for thread replies
app.post("/thread-reply", (req, res) => {
  const { threadID, userID, content } = req.body;

  const query = `
    INSERT INTO ThreadReply (TID, UID, content)
    VALUES (?, ?, ?);
  `;

  dbCon.query(query, [threadID, userID, content], (err, result) => {
    if (err) {
      console.error("Error creating thread reply:", err);
      res.status(500).json({ message: "Failed to create reply" });
    } else {
      res.status(201).json({ 
        message: "Reply created successfully",
        replyId: result.insertId 
      });
    }
  });
});

// Add this endpoint to fetch replies for a thread
app.get("/thread-replies/:threadId", (req, res) => {
  const threadId = req.params.threadId;

  const query = `
    SELECT 
      TR.*,
      U.username
    FROM ThreadReply TR
    JOIN User U ON TR.UID = U.UID
    WHERE TR.TID = ?
    ORDER BY TR.timestamp DESC
  `;

  dbCon.query(query, [threadId], (err, result) => {
    if (err) {
      console.error("Error fetching thread replies:", err);
      res.status(500).json({ message: "Failed to fetch replies" });
    } else {
      res.json(result);
    }
  });
}); 

// Start the backend server at localhost:8800
app.listen(8800, ()=>{
  console.log("Connected to backend!");
}); 
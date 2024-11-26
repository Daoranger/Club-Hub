import React, {
        useState,
        useEffect
    } from "react";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const ClubHomePage = () => {
  const { clubID: CID } = useParams(); // Get the Club ID from the URL
  const [isOwner, setIsOwner] = useState(false); // Track if the user is an owner
  const [chatroomName, setChatroomName] = useState(""); // State for chatroom name
  const [message, setMessage] = useState(""); // Success or error message
  const { userID } = useUserContext();
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [clubThreads, setClubThreads] = useState([]);
  const [clubChatrooms, setClubChatrooms] = useState([]);

  const fetchData = () => {
    axios
    .get("http://localhost:8800/club", { params: { CID } })
    .then((response) => {
      setClubName(response.data[0].name);
      setClubDesc(response.data[0].description);
    })
    .catch((err) => {
      console.error(err);
    });

    axios
    .get("http://localhost:8800/threads", { params: { CID } })
    .then((response) => {
      console.log(response.data);
      setClubThreads(response.data);
    })
    .catch((err) => {
      console.error(err);
    });

    axios
    .get("http://localhost:8800/chatrooms", { params: { CID } })
    .then((response) => {
      setClubChatrooms(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:8800/roles", { params: { userID } })
      .then((response) => {
        // Check if the user is an owner
        const roles = response.data.map((role) => role.name);
        setIsOwner(roles.includes("Owner"));
      })
      .catch((err) => console.error(err));
  }, [userID]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateChatroom = (e) => {
    e.preventDefault();
    // Make a POST request to create a chatroom
    axios
      .post("http://localhost:8800/create-chatroom", {
        clubID: CID,
        chatroomName,
      })
      .then((response) => {
        setMessage("Chatroom created successfully!");
        setChatroomName(""); // Reset input
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to create chatroom.");
      });
  };

  return (
    <div>
      <header>
        <h1>Welcome to the {clubName} Club!</h1>
      </header>
      <main>
        <section>
          <h2>About Our Club</h2>
          <p>{clubDesc}</p>
        </section>
        <section>
          <h2>Club Threads</h2>
          <nav>
            <ul>
              {clubThreads.map((thread) => (
                <li key={thread.TID}>
                  <a href={`/${CID}/threads/${thread.TID}`}>{thread.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <h2>Club ChatRooms</h2>
          <nav>
            <ul>
              {clubChatrooms.map((chatroom) => (
                <li key={chatroom.CRID}>
                  <a href={`/chatroom/${chatroom.CRID}`}>{chatroom.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          {isOwner && (
            <form onSubmit={handleCreateChatroom} style={{ marginTop: "20px" }}>
              <h3>Create a New Chatroom</h3>
              <input
                type="text"
                placeholder="Chatroom Name"
                value={chatroomName}
                onChange={(e) => setChatroomName(e.target.value)}
                style={{
                  padding: "10px",
                  width: "300px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#2c3e50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Create Chatroom
              </button>
              {message && <p style={{ marginTop: "10px" }}>{message}</p>}
            </form>
          )}

          <Outlet />
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Club Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClubHomePage;

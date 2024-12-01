import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clubs, setClubs] = useState([]);
  const { userID } = useUserContext();

  useEffect(() => {
    // Fetch clubs from the backend
    axios.get("http://localhost:8800/clubs")
      .then(response => {
        setClubs(response.data);
      })
      .catch(error => {
        console.error("Error fetching clubs:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleJoinClub = (clubID) => {
    axios.post("http://localhost:8800/join-club", { userID, clubID })
      .then(response => {
        alert(response.data.message);
        // Refresh the dashboard
        window.location.reload();
      })
      .catch(error => {
        console.error("Error joining club:", error);
      });
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Club Search</h1>
      <input
        type="text"
        placeholder="Search for a club..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <ul>
          {filteredClubs.map((club) => (
            <li key={club.CID}>
              {club.name}
              <button onClick={() => handleJoinClub(club.CID)}>Join Club</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
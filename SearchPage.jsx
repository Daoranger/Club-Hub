import React, { useState } from "react";

const clubs = [
  "Chess Club",
  "Science Club",
  "Math Club",
  "Drama Club",
  "Art Club",
  "Music Club",
  "Sports Club",
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClubs = clubs.filter((club) =>
    club.toLowerCase().includes(searchTerm.toLowerCase())
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
      <ul>
        {filteredClubs.map((club, index) => (
          <li key={index}>{club}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
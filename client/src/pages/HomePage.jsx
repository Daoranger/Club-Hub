// src/pages/HomePage.js
import React from "react";

function HomePage() {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>This is where users will land after logging in.</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    marginTop: "50px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
  },
};

export default HomePage;

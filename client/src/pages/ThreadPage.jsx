import React from "react";
import { useNavigate } from "react-router-dom";


function ThreadPage() {

  const navigate = useNavigate(); // Get the navigate function

  const handleCreateThreadClick = () => {
    navigate("/create-thread"); // Navigate to the create thread page
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <div style={styles.clubBanner}>
          <img
            src="your-banner-url.png" // Replace with your banner image URL
            alt="Club Banner"
            style={styles.bannerImage}
          />
          <div style={styles.clubInfo}>
            <h1 style={styles.clubName}>Club Name</h1>
            <p style={styles.clubDescription}>
              A place for all your club discussions, events, and announcements.
            </p>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        <div style={styles.ThreadsContainer}>
          <h2 style={styles.sectionHeading}>Latest Threads</h2>
          <div style={styles.Thread}>
            <h3 style={styles.ThreadTitle}>Welcome to Club Threads!</h3>
            <p style={styles.ThreadText}>
              This is a sample Thread. Use this area to start discussions.
            </p>
          </div>
          <div style={styles.Thread}>
            <h3 style={styles.ThreadTitle}>Upcoming Club Events</h3>
            <p style={styles.ThreadText}>
              Stay tuned for the latest updates on club activities and
              announcements!
            </p>
          </div>
        </div>
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarHeading}>About this Thread Page</h3>
          <p style={styles.sidebarText}>
            Have a question? Make a Thread! These threads connects students with clubs, events, and discussions in
            one central platform. Make your threads and join the conversation!
          </p>
          <button onClick={handleCreateThreadClick} style={styles.createThreadButton}>
            Create Thread
          </button>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f6f7f8",
    color: "#1a1a1b",
  },
  header: {
    backgroundColor: "#0079d3",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
  clubBanner: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
  bannerImage: {
    width: "50px",
    height: "50px",
    borderRadius: "25px",
    marginRight: "15px",
  },
  clubInfo: {
    textAlign: "left",
  },
  clubName: {
    fontSize: "1.5rem",
    margin: "0",
  },
  clubDescription: {
    fontSize: "1rem",
    margin: "0",
    color: "#d7dadd",
  },
  mainContent: {
    display: "flex",
    maxWidth: "1000px",
    margin: "20px auto",
    gap: "20px",
  },
  ThreadsContainer: {
    flex: 3,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  sectionHeading: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  Thread: {
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: "15px",
    marginBottom: "15px",
  },
  ThreadTitle: {
    fontSize: "1.1rem",
    margin: "0 0 5px",
    color: "#0079d3",
  },
  ThreadText: {
    fontSize: "0.9rem",
    margin: "0",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  sidebarHeading: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  sidebarText: {
    fontSize: "0.9rem",
    marginBottom: "15px",
  },
  createThreadButton: {
    backgroundColor: "#0079d3",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
};

export default ThreadPage;

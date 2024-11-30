import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function IndividualThreadPage() {
  const [thread, setThread] = useState(null);
  const { threadID } = useParams();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/thread/${threadID}`);
        setThread(response.data);
      } catch (error) {
        console.error("Error fetching thread:", error);
      }
    };

    fetchThread();
  }, [threadID]);

  if (!thread) return <div>Loading...</div>;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.mainContent}>
        <div style={styles.threadContainer}>
          <div style={styles.threadHeader}>
            <span style={styles.category}>{thread.category}</span>
            <h1 style={styles.title}>{thread.title}</h1>
          </div>
          
          <div style={styles.threadContent}>
            <p style={styles.content}>{thread.content}</p>
          </div>
          
          {/* Comments section can be added here later */}
          <div style={styles.commentsSection}>
            <h3>Comments</h3>
            <p>Comments feature coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#f6f7f8",
    minHeight: "100vh",
    padding: "20px",
  },
  mainContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  threadContainer: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  threadHeader: {
    marginBottom: "20px",
  },
  category: {
    backgroundColor: "#e9ecef",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "14px",
    color: "#495057",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginTop: "10px",
    color: "#1a1a1b",
  },
  threadContent: {
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#1a1a1b",
  },
  commentsSection: {
    marginTop: "20px",
  },
};

export default IndividualThreadPage; 
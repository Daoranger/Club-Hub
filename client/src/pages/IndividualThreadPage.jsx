import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function IndividualThreadPage() {
  const [thread, setThread] = useState(null);
  const { threadID } = useParams();
  const [replyContent, setReplyContent] = useState(""); // State for reply content
  const userID = 1;

  // Fetch thread data from the server
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

  // If thread is not loaded, show loading message
  if (!thread) return <div>Loading...</div>;  

  // Function to handle reply submission
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return; // Don't submit empty replies
    try {
      //console.log("Submitting reply:", replyContent); // Debugging line
      await axios.post("http://localhost:8800/thread-reply", {
        threadID,
        userID,
        content: replyContent
      });
      // Clear the input after successful submission
      setReplyContent("");
      // You might want to refresh the thread/comments here
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

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
          
          <div style={styles.commentsSection}>
            <h3>Comments</h3>
            {/* Add reply form */}
            <div style={styles.replyForm}>
              <textarea 
                style={styles.replyInput} 
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button style={styles.replyButton} onClick={handleReplySubmit}>
                Post Reply
              </button>
            </div>
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
  commentsSection: {
    marginTop: "20px",
  },
  replyForm: {
    marginTop: "15px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "35px",
  },
  replyInput: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  replyButton: {
    backgroundColor: "#0079d3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#005fa3",
    },
  },
};

export default IndividualThreadPage; 
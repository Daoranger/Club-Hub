import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function IndividualThreadPage() {
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const { threadID } = useParams();
  const userID = 1; // Replace with actual user ID from your auth system

  // Fetch thread and replies
  const fetchThreadAndReplies = async () => {
    try {
      // Fetch thread
      const threadResponse = await axios.get(`http://localhost:8800/thread/${threadID}`);
      setThread(threadResponse.data);

      // Fetch replies
      const repliesResponse = await axios.get(`http://localhost:8800/thread-replies/${threadID}`);
      console.log("Replies:", repliesResponse.data); // Debug log
      setReplies(repliesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchThreadAndReplies();
  }, [threadID]);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    try {
      await axios.post("http://localhost:8800/thread-reply", {
        threadID,
        userID,
        content: replyContent
      });
      
      // Clear the input and refresh replies
      setReplyContent("");
      fetchThreadAndReplies(); // Refresh the replies after posting
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

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
          
          <div style={styles.commentsSection}>
            <h3>Comments ({replies.length})</h3>
            <div style={styles.replyForm}>
              <textarea 
                style={styles.replyInput} 
                placeholder="Share your thoughts..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button 
                style={styles.replyButton}
                onClick={handleReplySubmit}
              >
                Comment
              </button>
            </div>

            {/* Display replies */}
            <div style={styles.repliesList}>
              {replies.length > 0 ? (
                replies.map((reply) => (
                  <div key={reply.TRID} style={styles.replyItem}>
                    <div style={styles.replyHeader}>
                      <span style={styles.replyUsername}>{reply.username}</span>
                      <span style={styles.replyTimestamp}>
                        {new Date(reply.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p style={styles.replyContent}>{reply.content}</p>
                  </div>
                ))
              ) : (
                <p style={styles.noReplies}>No replies yet. Be the first to reply!</p>
              )}
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
  repliesList: {
    marginTop: "20px",
  },
  replyItem: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    marginBottom: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
  },
  replyHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  replyUsername: {
    fontWeight: "600",
    color: "#1a1a1b",
  },
  replyTimestamp: {
    color: "#787c7e",
    fontSize: "12px",
  },
  replyContent: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#1a1a1b",
    margin: 0,
  },
  noReplies: {
    textAlign: "center",
    color: "#787c7e",
    fontStyle: "italic",
    padding: "20px 0",
  }
};

export default IndividualThreadPage; 
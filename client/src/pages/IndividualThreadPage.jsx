import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function IndividualThreadPage() {
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showInbox, setShowInbox] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isInboxExpanded, setIsInboxExpanded] = useState(false);
  const { threadID } = useParams();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/thread/${threadID}`);
        setThread(response.data);
        // Fetch comments
        const commentsResponse = await axios.get(`http://localhost:8800/thread/${threadID}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching thread:", error);
      }
    };

    fetchThread();
  }, [threadID]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8800/thread/${threadID}/comments`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
    setShowInbox(true);
  };

  const handleCloseInbox = () => {
    setShowInbox(false);
    setSelectedComment(null);
    setIsInboxExpanded(false);
  };

  const handleRepliesClick = (e) => {
    e.stopPropagation(); // Prevent triggering parent click handlers
    setIsInboxExpanded(true);
  };

  const dynamicStyles = {
    inboxContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '500px',
      position: 'relative',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxHeight: isInboxExpanded ? '80vh' : '200px',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
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
        </div>
      </div>

      {/* Inbox Popup */}
      {showInbox && selectedComment && (
        <div style={styles.inboxOverlay} onClick={handleCloseInbox}>
          <div style={{...styles.inboxContent, ...dynamicStyles.inboxContent}} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton}
              onClick={handleCloseInbox}
            >
              ×
            </button>
            <div style={styles.inboxHeader}>
              <p>{selectedComment.content}</p>
            </div>
            <div style={styles.repliesContainer}>
              {!isInboxExpanded ? (
                <button 
                  style={styles.repliesButton}
                  onClick={handleRepliesClick}
                >
                  View Replies ▼
                </button>
              ) : (
                <div style={styles.repliesSection}>
                  <h4>Replies</h4>
                  {/* Add replies content here */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#1a1a1b",
  },
  inboxOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  inboxContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  collapsedInbox: {
    maxHeight: '150px',
    overflow: 'hidden',
    padding: '10px',
    position: 'relative',
  },
  expandedInbox: {
    maxHeight: '80vh',
    overflow: 'auto',
    padding: '10px',
  },
  repliesButton: {
    backgroundColor: '#0079d3',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
  repliesSection: {
    marginTop: '20px',
    borderTop: '1px solid #eee',
    paddingTop: '20px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '5px',
    lineHeight: '1',
  },
  inboxHeader: {
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
    marginBottom: '15px',
  },
  repliesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  repliesButton: {
    backgroundColor: 'transparent',
    color: '#0079d3',
    border: '1px solid #0079d3',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f0f7ff',
    },
  },
  repliesSection: {
    width: '100%',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
};

export default IndividualThreadPage; 
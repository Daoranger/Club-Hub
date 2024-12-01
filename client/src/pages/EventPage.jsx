import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

function EventPage() {
  const { clubID } = useParams();
  const { userID } = useUserContext();
  const [events, setEvents] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    street: "",
    city: "",
    zipcode: "",
    limit: "",
  });
  const [error, setError] = useState(null);

  // Fetch events and check if user is owner
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const eventsResponse = await axios.get(`http://localhost:8800/events`, {
          params: { clubID, userID }  // Added userID here
        });
        console.log("Events data:", eventsResponse.data);  // Debug log
        setEvents(eventsResponse.data);

        // Check if user is owner
        const rolesResponse = await axios.get(`http://localhost:8800/roles`, {
          params: { userID }
        });
        setIsOwner(rolesResponse.data.map(role => role.name).includes("Owner"));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load events. Please try again later.");
      }
    };

    fetchData();
  }, [clubID, userID]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/create-event", {
        ...newEvent,
        clubID
      });
      console.log("Create event response:", response.data);  // Debug log

      // Reset form
      setNewEvent({
        name: "",
        date: "",
        street: "",
        city: "",
        zipcode: "",
        limit: "",
      });

      // Refresh events
      const eventsResponse = await axios.get(`http://localhost:8800/events`, {
        params: { clubID, userID }
      });
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event. Please try again.");
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.post("http://localhost:8800/register-event", {
        eventID: eventId,
        userID,
      });
      // Refresh events
      const response = await axios.get(`http://localhost:8800/events`, {
        params: { clubID, userID }
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error registering for event:", error);
      setError("Failed to register for event. Please try again.");
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      await axios.post("http://localhost:8800/unregister-event", {
        eventID: eventId,
        userID,
      });
      // Refresh events
      const response = await axios.get(`http://localhost:8800/events`, {
        params: { clubID, userID }
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error unregistering from event:", error);
      setError("Failed to unregister from event. Please try again.");
    }
  };

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upcoming Events</h1>

      {isOwner && (
        <div style={styles.createEventSection}>
          <h2>Create New Event</h2>
          <form onSubmit={handleCreateEvent} style={styles.form}>
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="datetime-local"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={newEvent.street}
              onChange={(e) => setNewEvent({...newEvent, street: e.target.value})}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="City"
              value={newEvent.city}
              onChange={(e) => setNewEvent({...newEvent, city: e.target.value})}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Zipcode"
              value={newEvent.zipcode}
              onChange={(e) => setNewEvent({...newEvent, zipcode: e.target.value})}
              style={styles.input}
            />
            <input
              type="number"
              min="0"
              placeholder="Participant Limit"
              value={newEvent.limit === 0 ? "" : newEvent.limit} // Show empty string if value is 0
              onChange={(e) => {
                // If empty, set to empty string, otherwise set to non-negative number
                const value = e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value) || 0);
                setNewEvent({...newEvent, limit: value})
              }}
              style={styles.input}
            />
            <button type="submit" style={styles.createButton}>
              Create Event
            </button>
          </form>
        </div>
      )}

      <div style={styles.eventsList}>
        {events.length === 0 ? (
          <p style={styles.noEvents}>No upcoming events</p>
        ) : (
          events.map((event) => (
            <div key={event.EID} style={styles.eventCard}>
              <div style={styles.eventInfo}>
                <h3 style={styles.eventName}>{event.name}</h3>
                <p style={styles.eventDate}>
                  {new Date(event.date).toLocaleString()}
                </p>
                <p style={styles.eventLocation}>
                  {event.street && `${event.street}, `}
                  {event.city && `${event.city}, `}
                  {event.zipcode}
                </p>
                <p style={styles.eventParticipants}>
                  {event.registered_count || 0} / {event.limit || '∞'} participants
                </p>
              </div>
              <div style={styles.buttonGroup}>
                {event.is_registered ? (
                  <button
                    onClick={() => handleUnregister(event.EID)}
                    style={styles.unregisterButton}
                  >
                    Unregister
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(event.EID)}
                    style={styles.registerButton}
                    disabled={event.limit && event.registered_count >= event.limit}
                  >
                    {event.limit && event.registered_count >= event.limit 
                      ? "Event Full" 
                      : "Register"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
    minHeight: '100vh', // Added to ensure full height
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)', // Subtle gradient
    background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#000000',
    textAlign: 'center',
    marginBottom: '40px',
  },
  createEventSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    marginBottom: '30px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    width: '96%',
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  createButton: {
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  eventCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  eventName: {
    fontSize: '1.3rem',
    color: '#000000',
    marginBottom: '10px',
  },
  eventDate: {
    fontSize: '1rem',
    color: '#000000',
    marginBottom: '5px',
  },
  eventLocation: {
    fontSize: '1rem',
    color: '#000000',
    marginBottom: '5px',
  },
  eventParticipants: {
    fontSize: '0.9rem',
    color: '#000000',
    marginBottom: '15px',
  },
  registerButton: {
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  unregisterButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: '#dc3545',
    padding: '10px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  noEvents: {
    textAlign: 'center',
    color: '#000000',
    padding: '20px',
  }
};

export default EventPage; 
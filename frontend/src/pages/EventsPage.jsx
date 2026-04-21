import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinEvent = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/api/events/join/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    alert("Joined successfully!");
    fetchEvents();

  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};


const deleteEvent = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/events/${id}`, {
      headers: {
        Authorization: token
      }
    });

    alert("Event deleted");

    // refresh list
    fetchEvents();

  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};


const leaveEvent = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://hypehouse.onrender.com/api/events/leave/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    alert("Left event");
    fetchEvents();

  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchEvents();
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h1>All Events</h1>

{events.map((event) => (
  <div className="card shadow-sm p-4 mb-4" key={event._id}>
    
    <h3
      style={{ cursor: "pointer", color: "#0d6efd" }}
      onClick={() => navigate(`/event/${event._id}`)}
    >
      {event.title}
    </h3>

    <p className="text-muted">{event.description}</p>

    <p><b>📍 Location:</b> {event.location}</p>
    <p><b>📅 Date:</b> {new Date(event.date).toDateString()}</p>
    <p><b>👥 Attendees:</b> {event.attendees.length}</p>

    <div className="d-flex justify-content-between align-items-center mt-3">

      <div className="d-flex gap-2">
        {event.attendees.includes(localStorage.getItem("userId")) ? (
          <button
            className="btn btn-warning"
            onClick={() => leaveEvent(event._id)}
          >
            Leave
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => joinEvent(event._id)}
          >
            Join
          </button>
        )}

        {event.createdBy === localStorage.getItem("userId") && (
          <button
            className="btn btn-danger"
            onClick={() => deleteEvent(event._id)}
          >
            Delete
          </button>
        )}
      </div>

    </div>
  </div>
))}
      </div>
    </>
  );
}

export default EventsPage;
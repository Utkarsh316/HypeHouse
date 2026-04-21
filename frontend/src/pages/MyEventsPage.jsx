import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      const userId = localStorage.getItem("userId");

      const myEvents = res.data.filter(
        (event) =>
          event.createdBy === userId ||
          event.attendees.includes(userId)
      );

      setEvents(myEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">My Events</h2>

        {events.length === 0 ? (
          <p className="text-muted">No events yet</p>
        ) : (
          events.map((event) => (
            <div className="card shadow-sm p-4 mb-4" key={event._id}>
              
              <h4
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => navigate(`/event/${event._id}`)}
              >
                {event.title}
              </h4>

              <p className="text-muted">{event.description}</p>

              <p><b>📍 Location:</b> {event.location}</p>
              <p><b>📅 Date:</b> {new Date(event.date).toDateString()}</p>
              <p><b>👥 Attendees:</b> {event.attendees.length}</p>

              <div className="d-flex justify-content-between align-items-center mt-3">

                <span className="badge bg-info text-dark">
                  {event.createdBy === localStorage.getItem("userId")
                    ? "Created by you"
                    : "Joined"}
                </span>

              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyEventsPage;
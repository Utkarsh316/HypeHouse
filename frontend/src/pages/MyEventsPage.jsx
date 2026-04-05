import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyEventsPage() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    const userId = localStorage.getItem("userId");

    // filter events
    const myEvents = res.data.filter(
      (event) =>
        event.createdBy === userId ||
        event.attendees.includes(userId)
    );

    setEvents(myEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>My Events</h1>

        {events.length === 0 ? (
          <p>No events yet</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              style={{
                border: "1px solid white",
                margin: "10px",
                padding: "10px"
              }}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{new Date(event.date).toDateString()}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyEventsPage;
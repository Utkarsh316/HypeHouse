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

      <div style={{ padding: "20px" }}>
        <h1>All Events</h1>

        {events.map((event) => (
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
            <p>Attendees: {event.attendees.length}</p>

       <button
      onClick={() => joinEvent(event._id)}
      disabled={event.attendees.includes(localStorage.getItem("userId"))}
    >
      {event.attendees.includes(localStorage.getItem("userId"))
        ? "Already Joined"
        : "Join Event"}
    </button>

          </div>
        ))}
      </div>
    </>
  );
}

export default EventsPage;
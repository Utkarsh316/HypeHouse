import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/events/join/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      fetchEvent();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const leaveEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/events/leave/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      fetchEvent();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const deleteEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: token },
      });

      alert("Event deleted");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const userId = localStorage.getItem("userId");
  const isJoined = event.attendees.includes(userId);
  const isCreator = event.createdBy === userId;

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    event.location
  )}&output=embed`;

  return (
    <>
      <Navbar />

      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        
        {/* MAIN CARD */}
        <div className="card shadow-lg border-0 p-4">

          {/* TITLE */}
          <h1 className="mb-2">{event.title}</h1>
          <p className="text-muted mb-4">{event.description}</p>

          {/* INFO */}
          <div className="mb-4">
            <p><b>📍 Location:</b> {event.location}</p>
            <p><b>📅 Date:</b> {new Date(event.date).toDateString()}</p>
            <p><b>👥 Attendees:</b> {event.attendees.length}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-flex gap-2 flex-wrap mb-4">
            {isJoined ? (
              <button className="btn btn-warning" onClick={leaveEvent}>
                Leave Event
              </button>
            ) : (
              <button className="btn btn-primary" onClick={joinEvent}>
                Join Event
              </button>
            )}

            {isCreator && (
              <button className="btn btn-danger" onClick={deleteEvent}>
                Delete Event
              </button>
            )}

            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/events")}
            >
              Back
            </button>
          </div>

          {/* DIVIDER */}
          <hr />

          {/* MAP SECTION */}
          <div className="mt-3">
            <h5 className="mb-3">📍 Event Location</h5>

            <div
              className="rounded shadow-sm overflow-hidden border"
              style={{
                height: "300px",
                width: "100%",
              }}
            >
              <iframe
                title="map"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default EventDetailsPage;
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events`);
      const found = res.data.find((e) => e._id === id);
      setEvent(found);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  if (!event) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>Location: {event.location}</p>
        <p>Date: {new Date(event.date).toDateString()}</p>
        <p>Attendees: {event.attendees.length}</p>
      </div>
    </>
  );
}

export default EventDetailsPage;
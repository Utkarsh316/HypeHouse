import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const createEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/events/create",
        { title, description, date, location },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Event created!");
      navigate("/events");

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Create Event</h1>

        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <br /><br />

        <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <br /><br />

        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <br /><br />

        <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
        <br /><br />

        <button onClick={createEvent}>Create Event</button>
      </div>
    </>
  );
}

export default CreateEventPage;
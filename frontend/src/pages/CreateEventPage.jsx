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

  const createEvent = async (e) => {
    e.preventDefault();

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

      alert("Event created successfully!");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating event");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "700px" }}>
        <div className="card shadow-lg border-0 p-4">
          <h2 className="mb-4 text-center">Create Event</h2>

          <form onSubmit={createEvent}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/events")}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateEventPage;
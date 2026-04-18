import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 py-2">
      <div className="container-fluid">
        <button
          className="navbar-brand btn btn-link text-white text-decoration-none fw-bold fs-4 p-0"
          onClick={() => navigate("/events")}
          style={{ border: "none" }}
        >
          HypeHouse
        </button>

        <div className="d-flex align-items-center gap-2 ms-auto flex-wrap">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/events")}
          >
            Events
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/create-event")}
          >
            Create Event
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/my-events")}
          >
            My Events
          </button>

          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
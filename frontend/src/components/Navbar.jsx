import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ background: "black", color: "white", padding: "10px" }}>
      <span style={{ marginRight: "20px", cursor: "pointer" }} onClick={() => navigate("/events")}>
        Events
      </span>

      <span style={{ cursor: "pointer" }} onClick={logout}>
        Logout
      </span>
    </div>
  );
}

export default Navbar;
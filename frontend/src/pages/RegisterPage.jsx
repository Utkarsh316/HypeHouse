import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      alert("Registered successfully!");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 border-0" style={{ width: "420px" }}>
        
        <h2 className="text-center mb-4">Create Account 🚀</h2>

        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        <p
          className="text-center mt-3 text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
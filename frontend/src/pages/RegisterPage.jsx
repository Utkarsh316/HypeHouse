import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      alert("Registered successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Register</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={registerUser}>Register</button>

      <p onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default RegisterPage;
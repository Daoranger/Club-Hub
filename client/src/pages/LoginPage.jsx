import React from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8800/login", { username: username, password: password })
      .then(data => {
        if (data){
          navigate("/dashboard");
        }
      })
      .catch(err => {
        setError(`Error: ${err.response.data.errors[0].msg}`);
      })
  }

  const handleSignUp = () => {
    window.location.href = "/signup";
  }
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Login to Club Hub</h1>
      <form style={{ marginTop: "20px" }}>
        <input
          className={`text-area`}
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          className={`text-area`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            backgroundColor: "#2c3e50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <button
        type="button"
        onClick={handleSignUp}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          marginLeft: "10px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign Up
      </button>
      {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {error}
          </div>
      )}
      </form>
    </div>
  );
}

export default LoginPage;
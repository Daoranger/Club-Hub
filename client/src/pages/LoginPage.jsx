//Shervan's code
// src/pages/LoginPage.jsx
import React from "react";
import axios  from "axios";

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
      </form>
    </div>
  );
}

export default LoginPage;

//Nathan's code #2
// import React from "react";

// function LoginPage() {
//   return (
//     <div style={styles.container}>
//       <h1>Login Page</h1>
//       <p>Welcome to the login page!</p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     marginTop: "50px",
//     backgroundColor: "#f4f4f4",
//     borderRadius: "8px",
//   },
// };

// export default LoginPage;


// Nathan"s Old Code
// import React, { useState, useRef } from "react";
// import axiosInstance from "../axiosInstance";

// export default function LoginPage() {
//     const [email, setEmail] = useState("");
//     const [password, setPassord] = useState("");
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         let response = await //post login function
//     }
// }
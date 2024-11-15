//Shervan's code
// src/pages/LoginPage.jsx
import React from "react";

function LoginPage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Login to Club Hub</h1>
      <form style={{ marginTop: "20px" }}>
        <input
          type="email"
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
          type="password"
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
import React from "react";

function LoginPage() {
  return (
    <div style={styles.container}>
      <h1>Login Page</h1>
      <p>Welcome to the login page!</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    marginTop: "50px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
  },
};

export default LoginPage;


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
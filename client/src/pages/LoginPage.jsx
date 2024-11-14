import React, { useState, useRef } from "react";
import axiosInstance from "../axiosInstance";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassord] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await //post login function
    }
}
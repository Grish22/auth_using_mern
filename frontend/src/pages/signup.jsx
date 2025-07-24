import React from "react";
import { useState } from 'react';
import UseContext from "../context/usercontest.jsx";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const { setUserfunc } = UseContext();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
        };
        const fetchSignup = async () => {
            try {
                const response = await fetch("http://localhost:5001/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    console.log(result);
                    setUserfunc(result.user);
                    navigate("/login");
                }
                else {
                    alert("Signup failed: " + result);
                }
                console.log(result);
            } catch (error) {
                alert("Error during signup: " + error.message);
            }
        };
        fetchSignup();
    };
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                </label>

                <label>
                    Last Name:
                    <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                </label>

                <label>
                    Email:
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;

import react from "react";
import { useState } from 'react';
import UseContext from "../context/usercontest.jsx";
import { useNavigate } from "react-router-dom";
function Logout() {
    const { setUserfunc, setIsLoggedInfunc } = UseContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        const fetchLogout = async () => {
            try {
                const response = await fetch("http://localhost:5001/auth/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                if (response.ok) {
                    alert("Logout successful!");
                    setUserfunc(null);
                    setIsLoggedInfunc(false);
                    navigate("/login");
                } else {
                    alert("Logout failed.");
                }
            } catch (error) {
                alert("Error during logout: " + error.message);
            }
        };
        fetchLogout();
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
export default Logout;

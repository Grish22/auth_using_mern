import React from "react";
import UseContext from "../context/usercontest";
import { useNavigate } from "react-router-dom";
function Header() {
    const { isLoggedIn, setUserfunc, setIsLoggedInfunc } = UseContext();
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
                    localStorage.removeItem('user');
                    localStorage.removeItem('isLoggedIn');
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
        <ul>
            {isLoggedIn ? (
                <>
                    <li><a href="/">Home</a></li>
                    <button onClick={handleLogout}>Logout</button>
                    <li><a href="/demo">Demo</a></li>
                </>
            ) : (
                <>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                </>
            )}
        </ul>
    );
}

export default Header;

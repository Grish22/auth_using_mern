import React from "react";
import UseContext from "../context/usercontest";
function Header() {
    const { isLoggedIn } = UseContext();
    return (
        <ul>
            {isLoggedIn ? (
                <>
                    <li><a href="/">Home</a></li>
                    <li><a href="/logout">Logout</a></li>
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

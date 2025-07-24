import react from "react";
import { useState } from 'react';
import UseContext from "../context/usercontest.jsx";
import { useNavigate } from "react-router-dom";
function Logout() {
    const { setUserfunc, setIsLoggedInfunc } = UseContext();
    const navigate = useNavigate();
    
    return (
        <div>
            
        </div>
    );
}
export default Logout;

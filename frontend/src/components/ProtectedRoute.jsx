import React from "react";
import { Navigate } from "react-router-dom";
import UseContext from "../context/usercontest";
function ProtectedRoute({ children}) {
    const { isLoggedIn } = UseContext();
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return children;
}
export default ProtectedRoute;
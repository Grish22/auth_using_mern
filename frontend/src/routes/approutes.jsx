import React from "react";
import { createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/homes";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Layout from "./layouts";
import Logout from "../pages/logout";
import Demo from "../pages/demo";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
const router=createBrowserRouter(
        createRoutesFromElements(<Route path="/" element={<  Layout />}>
            <Route path="" element={< Home />} />
            <Route path="login" element={< Login />} />
            <Route path="signup" element={< Signup />} />
            <Route path="logout" element={
                <ProtectedRoute>
                    <Logout />
                </ProtectedRoute>
            } />
            <Route path="demo" element={
                <ProtectedRoute>
                    <Demo />
                </ProtectedRoute>
            } />
        </Route>)
    );

export default router;

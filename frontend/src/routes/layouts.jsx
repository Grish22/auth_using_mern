import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout() {
    return (
        <div  className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
                <ToastContainer position="top-right" autoClose={3000} />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;
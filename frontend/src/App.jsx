import { useState } from 'react'
import React from "react";
import {UserProvider} from "./context/usercontest";
import Login from "./pages/login.jsx";
import { RouterProvider } from 'react-router-dom'
import router from './routes/approutes.jsx'
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const setUserfunc = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };
  
  const setIsLoggedInfunc = (status) => {
    setIsLoggedIn(status);
    if (status) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  };
  return (
    <UserProvider value={{
      user,
      isLoggedIn,
      setUserfunc,
      setIsLoggedInfunc,
    }}>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App

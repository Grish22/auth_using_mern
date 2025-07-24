import { useState } from 'react'
import React from "react";
import {UserProvider} from "./context/usercontest";
import Login from "./pages/login.jsx";
import { RouterProvider } from 'react-router-dom'
import router from './routes/approutes.jsx'
function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUserfunc = (userData) => {
    setUser(userData);
  };
  const setIsLoggedInfunc = (status) => {
    setIsLoggedIn(status);
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

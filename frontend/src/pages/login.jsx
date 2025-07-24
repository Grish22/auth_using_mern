import React, { use } from "react";
import { useState ,useEffect} from "react";
import  UseContext  from "../context/usercontest.jsx";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserfunc, setIsLoggedInfunc } = UseContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchlogin = async () => {
      try {
        const response = await fetch("http://localhost:5001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (response.ok) {
            alert("Login successful!");
            console.log(data);
            setIsLoggedInfunc(true);
            navigate("/demo");

          } else {
            alert("Login failed: " + data.message);
            setIsLoggedInfunc(false);
            if(data.message==="User not found") {
                navigate("/signup");
            } else if(data.message==="Invalid credentials") {
              navigate("/login");
            }

          }
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchlogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

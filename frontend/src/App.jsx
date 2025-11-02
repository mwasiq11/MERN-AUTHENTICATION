import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useState, useEffect } from "react";

function App() {
  console.log("data");
  const [user, setuser] = useState(null);
  const [error, seterror] = useState('');
  useEffect(() => {

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setuser(res.data);
        } catch (err) {
          seterror("failed to fetch user data", err);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

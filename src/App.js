import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieGrid from "./components/MovieGrid";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <h2 className="logo">OTT Platform</h2>
          <div className="nav-links">
            <Link to="/">Movies</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MovieGrid />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

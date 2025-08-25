import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Top bar like Netflix */}
        <header className="topbar">
          <div className="brand">CineStream</div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/add">Add</Link>
            <Link to="/register">Register</Link>
          </nav>
        </header>

        {/* Page content */}
        <main className="page">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="footer">© {new Date().getFullYear()} CineStream</footer>
      </div>
    </Router>
  );
}

export default App;

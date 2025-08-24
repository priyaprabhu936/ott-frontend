import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div>
        <h1>OTT Platform</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

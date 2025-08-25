// src/components/MovieList.js
import React, { useEffect, useState } from "react";
import api from "../api";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      const { data } = await api.get("/api/movies");
      setMovies(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    try {
      await api.delete(`/api/movies/${id}`);
      setMovies((m) => m.filter((x) => x._id !== id));
    } catch (e) {
      alert("Delete failed");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="page">
      <div className="topbar">
        <h1>OTT Platform</h1>
        <div className="actions">
          {token ? (
            <>
              <Link to="/add" className="btn">+ Add Movie</Link>
              <button className="btn"
                onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </div>

      <h2>🎬 Movies</h2>
      <div className="grid">
        {movies.map((m) => (
          <MovieCard key={m._id || m.title} movie={m} onDelete={token ? handleDelete : undefined} />
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import API_URL from "../api";
import "./MovieGrid.css";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-card" key={movie._id}>
          <img src={movie.poster} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default MovieList;

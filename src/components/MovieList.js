import React, { useEffect, useState } from "react";
import API from "../api";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error("Fetch movies error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h2>🎬 Movies</h2>
      {movies.length === 0 ? (
        <p>No movies yet.</p>
      ) : (
        <ul>
          {movies.map((m, i) => (
            <li key={m._id || i}>
              {m.title} {m.year ? `(${m.year})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;

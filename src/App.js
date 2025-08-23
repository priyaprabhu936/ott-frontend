import React, { useEffect, useState } from "react";
import { getMovies, addMovie, deleteMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");

  // Movies fetch
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const { data } = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err.message);
    }
  };

  // Add Movie
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await addMovie({ title, description, poster });
      setTitle("");
      setDescription("");
      setPoster("");
      fetchMovies();
    } catch (err) {
      console.error("Error adding movie:", err.message);
    }
  };

  // Delete Movie
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (err) {
      console.error("Error deleting movie:", err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎬 OTT Movies</h1>

      {/* Add Movie Form */}
      <form onSubmit={handleAddMovie} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Movie</button>
      </form>

      {/* Movie List */}
      <div>
        {movies.map((movie) => (
          <div
            key={movie._id || movie.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "150px" }}
              />
            )}
            <br />
            <button onClick={() => handleDelete(movie._id || movie.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

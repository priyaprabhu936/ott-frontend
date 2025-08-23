import React, { useEffect, useState } from "react";
import { getMovies, addMovie, deleteMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch movies
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

  // Add / Edit Movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Edit mode
        await fetch(`https://ott-backend-imh7.onrender.com/api/movies/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, poster }),
        });
        setEditId(null);
      } else {
        // Add mode
        await addMovie({ title, description, poster });
      }
      setTitle("");
      setDescription("");
      setPoster("");
      fetchMovies();
    } catch (err) {
      console.error("Error saving movie:", err.message);
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

  // Edit Movie (prefill form)
  const handleEdit = (movie) => {
    setEditId(movie._id);
    setTitle(movie.title);
    setDescription(movie.description);
    setPoster(movie.poster);
  };

  // Filter movies by search
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🎬 OTT Movies</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto 20px auto",
          display: "block",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      />

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto 30px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: editId ? "#28a745" : "#007BFF",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {editId ? "✏ Update Movie" : "➕ Add Movie"}
        </button>
      </form>

      {/* Movies Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
              />
            )}
            <h3>{movie.title}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>{movie.description}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={() => handleEdit(movie)}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#ffc107",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ✏ Edit
              </button>
              <button
                onClick={() => handleDelete(movie._id)}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

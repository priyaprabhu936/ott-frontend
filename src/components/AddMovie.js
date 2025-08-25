import React, { useState } from "react";
import API_URL from "../api";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMovie = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, poster }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Movie added successfully!");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add Movie</h2>
      <form onSubmit={handleAddMovie}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddMovie;

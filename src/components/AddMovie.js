import React, { useState } from "react";
import API from "../api";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title required");
    try {
      const payload = { title };
      if (year) payload.year = Number(year);
      await API.post("/movies", payload);
      alert("Movie added!");
      setTitle("");
      setYear("");
    } catch (err) {
      console.error("Add movie error:", err);
      alert("Failed to add movie");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, marginBottom: 16 }}>
      <h3>Add Movie</h3>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, width: 240 }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Year (optional)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: 8, width: 240 }}
          inputMode="numeric"
        />
      </div>
      <button type="submit" style={{ padding: "8px 16px" }}>
        Save
      </button>
    </form>
  );
}

export default AddMovie;

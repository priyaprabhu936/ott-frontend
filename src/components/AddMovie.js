// src/components/AddMovie.js
import React, { useState } from "react";
import api from "../api";

export default function AddMovie() {
  const [form, setForm] = useState({
    title: "", poster: "", year: "", genre: "", description: ""
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/api/movies", form);
      setMsg("✅ Movie added!");
      setForm({ title: "", poster: "", year: "", genre: "", description: "" });
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Add failed"));
    }
  };

  return (
    <div className="container">
      <h2>Add Movie</h2>
      <form onSubmit={onSubmit} className="form">
        <input name="title" placeholder="Title" value={form.title} onChange={onChange} required />
        <input name="poster" placeholder="Poster URL" value={form.poster} onChange={onChange} required />
        <input name="year" placeholder="Year" value={form.year} onChange={onChange} />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={onChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} />
        <button type="submit">Save</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

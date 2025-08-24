import React, { useEffect, useState } from "react";
import { getMovies, addMovie, updateMovie, deleteMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState(3);
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err?.message || err);
      alert("Fetch failed, see console.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPoster("");
    setRating(3);
    setCategory("General");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        title,
        description,
        poster,
        rating: Number(rating),
        category,
      };

      if (editId) {
        await updateMovie(editId, payload);
      } else {
        await addMovie(payload);
      }
      resetForm();
      fetchMovies();
    } catch (err) {
      console.error("Error saving movie:", err?.message || err);
      alert("Save failed, see console.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (m) => {
    setEditId(m._id);
    setTitle(m.title || "");
    setDescription(m.description || "");
    setPoster(m.poster || "");
    setRating(m.rating || 3);
    setCategory(m.category || "General");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (err) {
      console.error("Error deleting movie:", err?.message || err);
      alert("Delete failed.");
    }
  };

  const filtered = movies.filter((m) =>
    (m.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif", background: "#f5f6f8", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: 16 }}>🎬 OTT Movies</h1>

      {/* Search */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="🔍 Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 10, width: "100%", maxWidth: 420, borderRadius: 8, border: "1px solid #ddd" }}
        />
      </div>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 720,
          margin: "0 auto 24px auto",
          display: "grid",
          gap: 10,
          gridTemplateColumns: "1fr 1fr",
          background: "white",
          padding: 16,
          borderRadius: 12,
          border: "1px solid #eee",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd", gridColumn: "1 / span 2" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd", gridColumn: "1 / span 2" }}
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd", gridColumn: "1 / span 2" }}
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        >
          <option value={1}>⭐ 1</option>
          <option value={2}>⭐ 2</option>
          <option value={3}>⭐ 3</option>
          <option value={4}>⭐ 4</option>
          <option value={5}>⭐ 5</option>
        </select>
        <input
          type="text"
          placeholder="Category (e.g. Action, Comedy)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />

        <div style={{ gridColumn: "1 / span 2", display: "flex", gap: 10 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "10px 14px",
              border: "none",
              borderRadius: 8,
              backgroundColor: editId ? "#28a745" : "#007bff",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {saving ? (editId ? "Updating..." : "Adding...") : (editId ? "✏ Update Movie" : "➕ Add Movie")}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "10px 14px",
                border: "1px solid #ccc",
                borderRadius: 8,
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              ✨ Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Loading & Empty */}
      {loading && <div style={{ textAlign: "center", color: "#666" }}>Loading…</div>}
      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", color: "#666" }}>No movies found.</div>
      )}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {filtered.map((m) => (
          <div
            key={m._id}
            style={{
              background: "white",
              border: "1px solid #eee",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {m.poster ? (
              <img src={m.poster} alt={m.title} style={{ width: "100%", height: 220, objectFit: "cover" }} />
            ) : (
              <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
                No Poster
              </div>
            )}
            <div style={{ padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>{m.title}</h3>
                <span style={{ fontSize: 12, background: "#eef2ff", color: "#334155", padding: "2px 8px", borderRadius: 999 }}>
                  {m.category || "General"}
                </span>
              </div>
              <div style={{ marginTop: 6, color: "#555", fontSize: 14 }}>{m.description}</div>
              <div style={{ marginTop: 6, fontSize: 14 }}>⭐ {m.rating || 3}</div>

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => handleEdit(m)}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    border: "none",
                    borderRadius: 8,
                    background: "#ffc107",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    border: "none",
                    borderRadius: 8,
                    background: "#dc3545",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", color: "#888", fontSize: 12, marginTop: 24 }}>
        Built with React • Connected to Render backend
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { getMovies, addMovie, updateMovie, deleteMovie, login, register } from "./api";

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });

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

  const isAdmin = !!user?.isAdmin;

  useEffect(() => { fetchMovies(); }, []);
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await getMovies();
      setMovies(data);
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setTitle(""); setDescription(""); setPoster(""); setRating(3);
    setCategory("General"); setEditId(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { title, description, poster, rating: Number(rating), category };
    try {
      setSaving(true);
      if (editId) await updateMovie(editId, payload);
      else await addMovie(payload);
      resetForm(); fetchMovies();
    } catch {
      alert(isAdmin ? "Save failed" : "Admin login required");
    } finally { setSaving(false); }
  };

  const handleEdit = (m) => {
    setEditId(m._id);
    setTitle(m.title || ""); setDescription(m.description || "");
    setPoster(m.poster || ""); setRating(m.rating || 3); setCategory(m.category || "General");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    try { await deleteMovie(id); fetchMovies(); } catch { alert("Delete failed"); }
  };

  const doAuth = async (e) => {
    e.preventDefault();
    const body = authMode === "login" ? { email, password } : { name, email, password };
    const fn = authMode === "login" ? login : register;
    try {
      const { data } = await fn(body);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setName(""); setEmail(""); setPassword("");
      fetchMovies();
      alert(`Welcome ${data.user.name}! ${data.user.isAdmin ? "You are Admin ✅" : ""}`);
    } catch {
      alert("Auth failed. Check details.");
    }
  };

  const logoutNow = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif", background: "#f5f6f8", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: 12 }}>🎬 OTT Movies</h1>

      <div style={{ maxWidth: 1100, margin: "0 auto 12px", display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <input
          type="text" placeholder="🔍 Search by title…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 10, flex: 1, borderRadius: 8, border: "1px solid #ddd" }}
        />
        {user && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "#333" }}>Hello, <b>{user.name}</b> {user.isAdmin ? "(Admin)" : ""}</span>
            <button onClick={logoutNow} style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8, background: "white" }}>
              Logout
            </button>
          </div>
        )}
      </div>

      {!user && (
        <form onSubmit={doAuth}
          style={{ maxWidth: 480, margin: "0 auto 20px", background: "white", padding: 16,
                   borderRadius: 12, border: "1px solid #eee", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button type="button" onClick={() => setAuthMode("login")}
              style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd",
                       background: authMode === "login" ? "#e6f0ff" : "white" }}>
              Login
            </button>
            <button type="button" onClick={() => setAuthMode("register")}
              style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd",
                       background: authMode === "register" ? "#e6f0ff" : "white" }}>
              Register
            </button>
          </div>

          {authMode === "register" && (
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required
                   style={{ padding: 10, width: "100%", borderRadius: 8, border: "1px solid #ddd", marginBottom: 8 }} />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                 style={{ padding: 10, width: "100%", borderRadius: 8, border: "1px solid #ddd", marginBottom: 8 }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                 style={{ padding: 10, width: "100%", borderRadius: 8, border: "1px solid #ddd", marginBottom: 12 }} />
          <button type="submit" style={{ padding: 10, width: "100%", border: "none", borderRadius: 8, background: "#007bff", color: "white", fontWeight: "bold" }}>
            {authMode === "login" ? "Login" : "Create Account"}
          </button>
          <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>Tip: First registered user becomes <b>Admin</b>.</div>
        </form>
      )}

      {user?.isAdmin && (
        <form onSubmit={handleSave}
          style={{ maxWidth: 720, margin: "0 auto 24px", display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr",
                   background: "white", padding: 16, borderRadius: 12, border: "1px solid #eee",
                   boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <input type="text" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} required
                 style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd", gridColumn: "1 / span 2" }} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required
                 style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd", gridColumn: "1 / span 2" }} />
          <input type="text" placeholder="Poster URL" value={poster} onChange={(e) => setPoster(e.target.value)} required
                 style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd", gridColumn: "1 / span 2" }} />
          <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}>
            <option value={1}>⭐ 1</option><option value={2}>⭐ 2</option><option value={3}>⭐ 3</option><option value={4}>⭐ 4</option><option value={5}>⭐ 5</option>
          </select>
          <input type="text" placeholder="Category (e.g. Action, Comedy)" value={category} onChange={(e) => setCategory(e.target.value)}
                 style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
          <div style={{ gridColumn: "1 / span 2", display: "flex", gap: 10 }}>
            <button type="submit" disabled={saving}
                    style={{ padding: "10px 14px", border: "none", borderRadius: 8, background: editId ? "#28a745" : "#007bff", color: "white", fontWeight: "bold" }}>
              {saving ? (editId ? "Updating..." : "Adding...") : (editId ? "✏ Update Movie" : "➕ Add Movie")}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); resetForm(); }}
                      style={{ padding: "10px 14px", border: "1px solid #ccc", borderRadius: 8, background: "white" }}>
                ✨ Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
        {movies
          .filter((m) => (m.title || "").toLowerCase().includes(search.toLowerCase()))
          .map((m) => (
          <div key={m._id} style={{ background: "white", border: "1px solid #eee", borderRadius: 12, overflow: "hidden",
                                     boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
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

              {isAdmin && (
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => handleEdit(m)}
                          style={{ flex: 1, padding: "8px 10px", border: "none", borderRadius: 8, background: "#ffc107", color: "white" }}>
                    ✏ Edit
                  </button>
                  <button onClick={() => handleDelete(m._id)}
                          style={{ flex: 1, padding: "8px 10px", border: "none", borderRadius: 8, background: "#dc3545", color: "white" }}>
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

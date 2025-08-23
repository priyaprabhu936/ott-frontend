import React, { useEffect, useState } from "react";
import { getMovies, addMovie, deleteMovie } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");

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
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      setAdding(true);
      await addMovie({ title, description, poster });
      setTitle("");
      setDescription("");
      setPoster("");
      fetchMovies();
    } catch (err) {
      console.error("Error adding movie:", err?.message || err);
      alert("Add failed. Check Console / Network.");
    } finally {
      setAdding(false);
    }
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

  const filtered = movies.filter(m =>
    m.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">🎬 OTT Movies</h1>

          <input
            type="text"
            placeholder="Search title…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-40 md:w-64 border rounded-xl px-3 py-2 outline-none focus:ring"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Add Movie Form */}
        <form
          onSubmit={handleAddMovie}
          className="bg-white p-5 rounded-2xl shadow-md mb-8 grid md:grid-cols-4 gap-3"
        >
          <input
            type="text"
            placeholder="Movie Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded-xl px-3 py-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border rounded-xl px-3 py-2"
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
            className="border rounded-xl px-3 py-2"
          />
          <button
            type="submit"
            disabled={adding}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl px-4 py-2"
          >
            {adding ? "Adding..." : "➕ Add Movie"}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-600">Loading movies…</div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center text-gray-500">No movies found.</div>
        )}

        {/* Movies Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Poster</span>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-600 line-clamp-3">{movie.description}</p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1"
                  >
                    🗑 Delete
                  </button>
                  {movie.poster && (
                    <a
                      href={movie.poster}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Poster
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        Built with React + Tailwind
      </footer>
    </div>
  );
}

export default App;

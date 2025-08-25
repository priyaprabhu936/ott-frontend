import React from "react";

/**
 * Static demo data (you can later replace with API results).
 * Posters are direct image URLs so it works on Vercel without any extra setup.
 */
const movies = [
  {
    id: 1,
    title: "Vikram",
    year: 2022,
    poster:
      "https://m.media-amazon.com/images/M/MV5BYjI2N2QyYjUtZjA1OC00NmE0LWE3MjQtYTU2NTFkYjM3YTE1XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 2,
    title: "Leo",
    year: 2023,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDhlYWVjM2ItYjE2Ny00YTBmLTg4NzctMDM4MTBmY2ZkNTQ2XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 3,
    title: "Jailer",
    year: 2023,
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2YzY2FiZWUtMGUwZi00NTkzLTg3OWItMDQ3Y2M0YTQ4NzdmXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 4,
    title: "Kantara",
    year: 2022,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmVmODU5YWEtNjZjNy00NzE3LTg4MDctNzY5YjE2YzE5N2VmXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 5,
    title: "RRR",
    year: 2022,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDQyNGEyYjAtM2QxMS00NzE2LWFmZjYtNGY0M2JmNzYxYjQ0XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 6,
    title: "K.G.F: Chapter 2",
    year: 2022,
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2JmNTU5NGQtNjM3YS00YmJmLWE2ZjEtNjAwYmQxZmE4YjExXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 7,
    title: "Ponniyin Selvan: I",
    year: 2022,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDQ5ZmYwOWEtN2UyNC00MTA3LTkwYjEtNGUxNDY2NjA5ZmRkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 8,
    title: "Jawan",
    year: 2023,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMGQxNDJkOWMtZDE4MS00MDEzLWE0N2EtYTQyZjQxNzEzNmQ4XkEyXkFqcGc@._V1_.jpg",
  },
];

export default function MovieList() {
  return (
    <section>
      <h2 className="section-title">Trending Now</h2>

      <div className="grid">
        {movies.map((m) => (
          <article key={m.id} className="card" aria-label={m.title}>
            <img
              className="poster"
              src={m.poster}
              alt={`${m.title} poster`}
              loading="lazy"
              onError={(e) => {
                // Simple fallback if an image fails
                e.currentTarget.src =
                  "https://via.placeholder.com/300x450/111111/cccccc?text=No+Poster";
              }}
            />
            <div className="meta">
              <h3 className="title" title={m.title}>{m.title}</h3>
              <span className="badge">{m.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

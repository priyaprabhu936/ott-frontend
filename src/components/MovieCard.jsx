// src/components/MovieCard.jsx
import React from "react";

export default function MovieCard({ movie, onDelete }) {
  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} />
      <div className="card-info">
        <h4>{movie.title}</h4>
        {movie.year && <span>{movie.year}</span>}
      </div>
      {onDelete && (
        <button className="danger" onClick={() => onDelete(movie._id)}>
          Delete
        </button>
      )}
    </div>
  );
}

import React from "react";
import { API_CONFIG } from "../../../utils/constants";
const { IMAGE_BASE_URL } = API_CONFIG; // Destructure the IMAGE_BASE_URL from API
import "./MovieDetails.css";

// Description: A component to display detailed information about a selected movie, including poster, title, release year, rating, runtime, genres, and overview.
const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  // Ensure the movie object has the necessary properties
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "/api/placeholder/300/450";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="movie-details">
          <img src={posterUrl} alt={movie.title} className="detail-poster" />
          <div className="detail-info">
            <h2>{movie.title}</h2>
            <p className="detail-year">{movie.release_date?.split("-")[0]}</p>
            <p className="detail-rating">
              ⭐ {movie.vote_average?.toFixed(1)}/10
            </p>
            {movie.runtime && (
              <p className="detail-runtime">{movie.runtime} minutes</p>
            )}
            <div className="detail-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="detail-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

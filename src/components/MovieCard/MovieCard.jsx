import React from "react";
import { IMAGE_BASE_URL } from "../../services/movieAPI";
import "./MovieCard.css";

const MovieCard = ({ movie, onMovieClick, isFavorite, onToggleFavorite }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "/api/placeholder/300/450";

  const handleCardClick = () => {
    onMovieClick(movie);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(movie.id);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-year">{movie.release_date?.split("-")[0]}</p>
        <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MovieCard;

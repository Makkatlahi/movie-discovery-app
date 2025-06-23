// MovieCard.jsx
import { IMAGE_BASE_URL } from "../../../services/movieAPI";
import "./MovieCard.css";

// Description: A card component to display movie details, including poster, title, release year, rating, and a favorite toggle button.
const MovieCard = ({ movie, onMovieClick, isFavorite, onToggleFavorite }) => {
  // Ensure the movie object has the necessary properties
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}` // Construct the full URL for the movie poster
    : "/api/placeholder/300/450"; // Fallback placeholder image if poster_path is not available

  // Function to handle card click, triggering the onMovieClick callback with the movie object
  const handleCardClick = () => {
    onMovieClick(movie); // Call the onMovieClick function with the movie object
  };

  // Function to handle favorite button click, preventing event propagation and toggling the favorite status
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the card click handler
    onToggleFavorite(movie.id); // Call the onToggleFavorite function with the movie ID to toggle its favorite status
  };

  // Render the movie card with poster, title, year, rating, and favorite button
  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} /> // Display the movie poster
        image
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
        {/* Extract the year from the release date */}
        <p className="movie-year">{movie.release_date?.split("-")[0]}</p>{" "}
        {/* Display the movie rating, formatted to one decimal place */}
        <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MovieCard;

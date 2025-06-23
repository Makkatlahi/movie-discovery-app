// Description: A modal component to display detailed information about a movie.
import { useEffect } from "react";
import { movieAPI } from "../../../services/movieAPI.js";
import "./MovieDetails.css";

// Description: A modal component to display detailed information about a movie, including its poster, title, release year, rating, runtime, genres, and overview.
const MovieDetails = ({ movie, onClose }) => {
  // Effect to handle escape key press for closing the modal and prevent background scroll
  useEffect(() => {
    // Function to handle escape key press
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose(); // Close the modal when Escape key is pressed
    };

    // Add event listener for keydown events to handle escape key
    document.addEventListener("keydown", handleEscape);
    // Prevent background scroll when modal is open
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Cleanup function to remove event listener and reset body overflow when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscape); // Remove the escape key event listener
      document.body.style.overflow = "unset"; // Reset body overflow to allow scrolling again
    };
  }, [onClose]);
  // If no movie is provided, return null to avoid rendering the modal
  if (!movie) return null;
  const posterUrl = movieAPI.getImageUrl(movie.poster_path); // Get the full URL for the movie poster using the movieAPI service

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/*Prevent click events from propagating to the overlay*/}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ✕
        </button>
        <div className="movie-details">
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="detail-poster"
          />
          <div className="detail-info">
            <h2>{movie.title}</h2>
            <p className="detail-year">
              {movie.release_date?.split("-")[0]}
            </p>{" "}
            // Extract the year from the release date
            <p className="detail-rating">
              ⭐ {movie.vote_average?.toFixed(1)}/10
            </p>
            {movie.runtime && (
              <p className="detail-runtime">{movie.runtime} minutes</p>
            )}
            {movie.genres?.length > 0 && (
              <div className="detail-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            <p className="detail-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

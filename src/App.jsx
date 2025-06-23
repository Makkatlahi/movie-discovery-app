// Description: Main application component that manages the movie browsing experience, including searching, viewing details, and managing favorites.
import { useState, useEffect } from "react";
import Header from "./components/Layout/Header/Header.jsx";
import Footer from "./components/Layout/Footer/Footer.jsx";
import MovieCard from "./components/UI/MovieCard/MovieCard.jsx";
import MovieDetails from "./components/UI/MovieDetails/MovieDetails.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useFavorites } from "./hooks/useFavorites.js";
import { movieAPI } from "./services/movieAPI.js";
import "./styles/App.css"; // Importing the main CSS file for styling
import "./styles/variables.css"; // Importing CSS variables for consistent styling across the app

const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search term input by the user
  const [selectedMovie, setSelectedMovie] = useState(null); // State to manage the currently selected movie for details view

  //Destructuring the custom hook useMovies to get the necessary data and functions
  const {
    movies, // Array of movie objects fetched from the API
    loading, // Boolean indicating if the movies are currently being loaded
    error, // Error message if an error occurred during the API call
    currentView, // Current view type (popular, search, favorites)
    loadPopularMovies, // Function to load popular movies from the API
    searchMovies, // Function to search for movies based on the search term
    showFavoriteMovies, // Function to filter and display favorite movies
  } = useMovies(); // Custom hook to manage movie data and API interactions

  // Custom hook to manage favorites functionality
  const { favorites, toggleFavorite, isFavorite, favoritesCount } =
    useFavorites();

  // Load popular movies on mount
  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Function to handle movie card click, fetching and displaying movie details
  const handleMovieClick = async (movie) => {
    try {
      const movieDetails = await movieAPI.getMovieDetails(movie.id);
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error("Error loading movie details:", error);
    }
  };

  const handleShowFavorites = () => {
    // Show favorite movies when the user clicks the favorites button
    showFavoriteMovies(favorites);
  };

  return (
    <div className="app">
      <Header
        currentView={currentView}
        onLoadPopular={loadPopularMovies}
        onShowFavorites={handleShowFavorites}
        favoritesCount={favoritesCount}
        onSearch={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="content">
        {/* Display error message if there is an error fetching movies */}
        {error && <div className="error-message">❌ {error}</div>}
        {/* Display loading indicator while movies are being fetched */}
        {loading ? (
          <div className="loading">🎬 Loading movies...</div>
        ) : (
          // Map through the movies array and render a MovieCard for each movie
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={handleMovieClick}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;

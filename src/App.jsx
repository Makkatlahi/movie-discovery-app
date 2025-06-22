import React, { useState, useEffect } from "react";
import { movieAPI } from "./services/movieAPI";
import SearchBar from "./components/SearchBar/SearchBar";
import Navigation from "./components/Navigation/Navigation";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import "./styles/App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movieFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentView, setCurrentView] = useState("popular");

  // Load popular movies on component mount
  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const loadPopularMovies = async () => {
    setLoading(true);
    const popularMovies = await movieAPI.getPopularMovies();
    setMovies(popularMovies);
    setCurrentView("popular");
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    const searchResults = await movieAPI.searchMovies(query);
    setMovies(searchResults);
    setCurrentView("search");
    setLoading(false);
  };

  const handleMovieClick = async (movie) => {
    const movieDetails = await movieAPI.getMovieDetails(movie.id);
    if (movieDetails) {
      setSelectedMovie(movieDetails);
    }
  };

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleViewChange = (view) => {
    if (view === "popular") {
      loadPopularMovies();
    } else if (view === "favorites") {
      const favoriteMovies = movies.filter((movie) =>
        favorites.includes(movie.id)
      );
      setMovies(favoriteMovies);
      setCurrentView("favorites");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">
          <span className="header-icon material-symbols-outlined">
            motion_play
          </span>{" "}
          Movie Discovery
        </h1>
        <Navigation
          currentView={currentView}
          onViewChange={handleViewChange}
          favoritesCount={favorites.length}
        />
        <SearchBar
          onSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>

      <main className="content">
        {loading ? (
          <div className="loading">🎬 Loading movies...</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={handleMovieClick}
                isFavorite={favorites.includes(movie.id)}
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

      <footer className="attribution">
        <p>
          This application uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
        <p>Powered by The Movie Database (TMDB)</p>
      </footer>
    </div>
  );
};

export default App;

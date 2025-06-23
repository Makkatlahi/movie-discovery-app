// Description: Custom hook to manage movie data, including fetching popular movies, searching, and displaying favorites.
import { useState } from "react";
import { movieAPI } from "../services/movieAPI.js";
import { VIEW_TYPES } from "../utils/constants.js";

// Custom hook to manage movie data
export const useMovies = () => {
  const [movies, setMovies] = useState([]); // Initialize movies state as an empty array
  const [loading, setLoading] = useState(false); // Initialize loading state as false
  const [currentView, setCurrentView] = useState(VIEW_TYPES.POPULAR); // Set default view to popular movies
  const [error, setError] = useState(null); // Initialize error state as null

  // Function to handle API calls and manage loading and error states
  const handleAPICall = async (apiCall, viewType) => {
    setLoading(true); // Set loading to true before making the API call
    setError(null); // Reset error state before the API call
    try {
      const result = await apiCall(); // Execute the API call passed as a parameter
      setMovies(result); // Update movies state with the result from the API call
      setCurrentView(viewType); // Set the current view based on the viewType parameter
    } catch (err) {
      setError(err.message); // Set error state with the error message if the API call fails
      console.error(`Error in ${viewType}:`, err); // Log the error for debugging
    } finally {
      // Ensure loading is set to false after the API call completes
      setLoading(false); // Set loading to false after the API call is done
    }
  };
  // Function to load popular movies
  const loadPopularMovies = () =>
    // Call handleAPICall with the API method and view type
    handleAPICall(() => movieAPI.getPopularMovies(), VIEW_TYPES.POPULAR);

  // Function to search for movies based on a query
  const searchMovies = (query) =>
    // Call handleAPICall with the search API method and view type
    handleAPICall(() => movieAPI.searchMovies(query), VIEW_TYPES.SEARCH);

  // Function to show favorite movies based on a list of favorite IDs
  const showFavoriteMovies = (favorites) => {
    // Filter the movies array to include only those with IDs in the favorites list
    const favoriteMovies = movies.filter((movie) =>
      favorites.includes(movie.id)
    );
    setMovies(favoriteMovies); // Update movies state with the filtered favorite movies
    setCurrentView(VIEW_TYPES.FAVORITES); // Set the current view to favorites
  };
  // Return the state and functions for use in components
  return {
    movies, // Array of movie objects
    loading, // Boolean indicating if data is being loaded
    error, // Error message if an error occurred during the API call
    currentView, // Current view type (popular, search, favorites)
    loadPopularMovies, // Function to load popular movies
    searchMovies, // Function to search for movies
    showFavoriteMovies, // Function to show favorite movies
  };
};

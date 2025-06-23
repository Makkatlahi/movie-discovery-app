// This hook manages a list of favorite items stored in localStorage.
import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../utils/constants";

// Custom hook to manage favorites in localStorage
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES); // Retrieve favorites from localStorage
      return saved ? JSON.parse(saved) : []; // Parse the saved favorites or return an empty array if none exist
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
      return []; // Return an empty array if there's an error
    }
  });

  // Effect to save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites)); // Save favorites to localStorage
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]); // Dependency array ensures this effect runs whenever favorites change

  // Function to toggle a movie's favorite status
  const toggleFavorite = (movieId) => {
    // Toggle the favorite status of a movie by its ID
    setFavorites(
      (prev) =>
        prev.includes(movieId) // Check if movieId is already in favorites
          ? prev.filter((id) => id !== movieId) // Remove movieId if it exists
          : [...prev, movieId] // Add movieId if it doesn't exist
    );
  };

  const isFavorite = (movieId) => favorites.includes(movieId); // Check if movieId is in favorites
  return {
    // Return the favorites array and utility functions
    favorites, // Array of favorite movie IDs
    toggleFavorite, // Function to toggle favorite status of a movie
    isFavorite, // Function to check if a movie is a favorite
    favoritesCount: favorites.length, // Count of favorite movies
  };
};

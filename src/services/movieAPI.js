//Movie API Service
const API_KEY = "23546b689d03516f9b1b4ca07d30b2bf";
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const movieAPI = {
  searchMovies: async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error searching movies:", error);
      return [];
    }
  },

  getPopularMovies: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch popular movies");
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error loading popular movies:", error);
      return [];
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
      );
      if (!response.ok) throw new Error("Failed to fetch movie details");
      return await response.json();
    } catch (error) {
      console.error("Error loading movie details:", error);
      return null;
    }
  },
};

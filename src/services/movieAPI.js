//Movie API Service
import { API_CONFIG } from "../utils/constants";

//getting the constants from the constants file
//destructuring the API_CONFIG object
const { API_KEY, BASE_URL, IMAGE_BASE_URL } = API_CONFIG;

class MovieAPIService {
  // Private method to fetch data from the API
  async #fetchAPI(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  // Public methods to interact with the API
  async searchMovies(query) {
    const data = await this.#fetchAPI(
      `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}` // Search for movies based on the query
    );
    // Check if results exist, otherwise return an empty array
    return data.results || [];
  }
  async getPopularMovies() {
    // Fetch popular movies from the API
    const data = await this.#fetchAPI(`/movie/popular?api_key=${API_KEY}`);
    return data.results || [];
  }

  async getMovieDetails(movieId) {
    // Fetch movie details along with videos and credits
    return this.#fetchAPI(
      `/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
    );
  }

  async getImageUrl(posterPath) {
    // Return the full image URL or a placeholder if no poster path is provided
    return posterPath
      ? `${IMAGE_BASE_URL}${posterPath}` // Construct the full URL for the movie poster
      : "/api/placeholder/300/450";
  }
}

// Exporting the MovieAPIService instance or 'singleton' pattern
export const movieAPI = new MovieAPIService();

//API Config

export const API_CONFIG = {
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || "YOUR_API_KEY",
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
};

// APP Constants

export const VIEW_TYPES = {
  POPULAR: "popular",
  SEARCH: "search",
  FAVORITES: "favorites",
};

export const STORAGE_KEYS = {
  FAVORITES: "moviefavorites",
};

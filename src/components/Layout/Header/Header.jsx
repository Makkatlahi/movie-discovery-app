// Description: Header component for the Movie Discovery application
import SearchBar from "../../UI/SearchBar/SearchBar.jsx";
import { VIEW_TYPES } from "../../../utils/constants.js";
import "./Header.css";

// Description: A header component that displays the application title, navigation buttons for popular movies and favorites, and a search bar for searching movies.
const Header = ({
  currentView, // Current view type (popular, search, favorites)
  onLoadPopular, // Function to load popular movies
  onShowFavorites, // Function to show favorite movies
  favoritesCount, // Count of favorite movies
  onSearch, // Function to handle search queries
  searchTerm, // Current search term
  setSearchTerm, // Function to set the search term
}) => {
  return (
    <header className="header">
      <h1>
        <span className="material-symbols-outlined">motion_play</span>Movie
        Discovery
      </h1>
      <nav className="nav-buttons">
        <button
          className={`nav-btn ${
            currentView === VIEW_TYPES.POPULAR ? "active" : ""
          }`}
          onClick={onLoadPopular}
        >
          Popular Movies
        </button>
        <button
          className={`nav-btn ${
            currentView === VIEW_TYPES.FAVORITES ? "active" : ""
          }`}
          onClick={onShowFavorites}
        >
          My Favorites ({favoritesCount})
        </button>
      </nav>
      <SearchBar
        onSearch={onSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </header>
  );
};

export default Header;

// Description: A search bar component for searching movies, with an input field and a button.
import "./SearchBar.css";

// This component allows users to search for movies by entering a query and pressing Enter or clicking the search button.
const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  // Function to handle key press events in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      // Check if the Enter key is pressed and the search term is not empty
      onSearch(searchTerm.trim()); // Call the onSearch function with the trimmed search term
    }
  };
  // Function to handle the search button click
  const handleSearchClick = () => {
    // Check if the search term is not just whitespace
    if (searchTerm.trim()) {
      // If the search term is valid
      onSearch(searchTerm.trim()); // Call the onSearch function with the trimmed search term
    }
  };

  // Render the search bar with an input field and a search button
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state when the input changes
        onKeyPress={handleKeyPress}
        className="search-input"
      />

      <button
        onClick={handleSearchClick}
        className="search-btn"
        disabled={!searchTerm.trim()} // Disable the button if the search term is empty or just whitespace
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;

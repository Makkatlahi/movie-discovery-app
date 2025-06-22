import React from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      <button onClick={handleSearchClick} className="search-btn">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;

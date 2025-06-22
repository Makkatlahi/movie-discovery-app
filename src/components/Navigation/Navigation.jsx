import React from "react";
import "./Navigation.css";

const Navigation = ({ currentView, onViewChange, favoritesCount }) => {
  return (
    <div className="nav-buttons">
      <button
        className={`nav-btn ${currentView === "popular" ? "active" : ""}`}
        onClick={() => onViewChange("popular")}
      >
        Popular Movies
      </button>
      <button
        className={`nav-btn ${currentView === "favorites" ? "active" : ""}`}
        onClick={() => onViewChange("favorites")}
      >
        My Favorites ({favoritesCount})
      </button>
    </div>
  );
};

export default Navigation;

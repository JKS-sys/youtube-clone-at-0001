import React from "react";
import "./FilterButtons.css";

const FilterButtons = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="filter-buttons">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-button ${
            selectedCategory === category ? "filter-button--active" : ""
          }`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;

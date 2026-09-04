import React, { useState } from "react";
import sortImg from "../../images/sort.png";

const SearchCountResult = ({ title, resultsCount = 0, sortType, onSortChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectSort = (type) => {
    if (onSortChange) onSortChange(type);
    setDropdownOpen(false);
  };

  const getSortLabel = () => {
    switch (sortType) {
      case "price-asc": return "Prix du plus bas au plus haut";
      case "price-desc": return "Prix du plus haut au plus bas";
      case "rating": return "Le mieux noté";
      case "best-seller": return "Best-seller";
      default: return "Trier par";
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center pt-3 px-2 mb-2">
      <div className="sub-tile" style={{ fontSize: "20px", fontWeight: "bold", color: "#2c3e50" }}>
        {title || `${resultsCount} Produits trouvés`}
      </div>

      <div className="position-relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="btn btn-outline-dark btn-sm d-flex align-items-center rounded-pill px-3"
          style={{ cursor: "pointer", fontWeight: "600" }}>
          <img
            width="16px"
            height="16px"
            className="me-2"
            src={sortImg}
            alt="sort"
          />
          {getSortLabel()}
        </button>

        {dropdownOpen && (
          <div
            className="card shadow position-absolute end-0 mt-1 py-1"
            style={{ zIndex: 1050, width: "230px", borderRadius: "8px" }}>
            <div
              onClick={() => handleSelectSort("")}
              className="px-3 py-2 border-bottom hover-bg"
              style={{ cursor: "pointer", fontSize: "14px" }}>
              Par défaut
            </div>
            <div
              onClick={() => handleSelectSort("best-seller")}
              className="px-3 py-2 border-bottom hover-bg"
              style={{ cursor: "pointer", fontSize: "14px" }}>
              Best-seller
            </div>
            <div
              onClick={() => handleSelectSort("rating")}
              className="px-3 py-2 border-bottom hover-bg"
              style={{ cursor: "pointer", fontSize: "14px" }}>
              Le mieux noté
            </div>
            <div
              onClick={() => handleSelectSort("price-asc")}
              className="px-3 py-2 border-bottom hover-bg"
              style={{ cursor: "pointer", fontSize: "14px" }}>
              Prix ​​du plus bas au plus haut
            </div>
            <div
              onClick={() => handleSelectSort("price-desc")}
              className="px-3 py-2 hover-bg"
              style={{ cursor: "pointer", fontSize: "14px" }}>
              Prix du plus haut au plus bas
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCountResult;
